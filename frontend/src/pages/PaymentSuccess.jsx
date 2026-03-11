import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2, Home, FileText, Mail } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const [pollCount, setPollCount] = useState(0);
  const maxPolls = 10;

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const pollPaymentStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/payments/status/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch payment status');
        }
        
        const data = await response.json();
        setPaymentData(data);
        
        if (data.payment_status === 'paid') {
          setStatus('success');
          return true; // Stop polling
        } else if (data.status === 'expired') {
          setStatus('expired');
          return true; // Stop polling
        }
        
        return false; // Continue polling
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (pollCount >= maxPolls - 1) {
          setStatus('error');
          return true; // Stop polling after max attempts
        }
        return false;
      }
    };

    // Initial poll
    pollPaymentStatus().then((shouldStop) => {
      if (!shouldStop) {
        // Set up polling interval
        const interval = setInterval(async () => {
          setPollCount((prev) => {
            if (prev >= maxPolls) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
          
          const shouldStop = await pollPaymentStatus();
          if (shouldStop) {
            clearInterval(interval);
          }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(interval);
      }
    });
  }, [sessionId, pollCount]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-8 pb-8 text-center">
            <Loader2 className="w-16 h-16 text-[#d4af37] mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-[#0f1f3d] mb-2">Vérification du paiement...</h2>
            <p className="text-gray-600">Veuillez patienter pendant que nous confirmons votre paiement.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (status === 'success' && paymentData) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-2 border-green-500">
            <CardHeader className="bg-green-50 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl text-green-700">Paiement Réussi !</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center">
                <Badge className="bg-[#d4af37] text-[#0f1f3d] text-lg px-4 py-2">
                  {paymentData.product_name}
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant payé</span>
                  <span className="font-bold text-[#0f1f3d]">{paymentData.amount_total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut</span>
                  <Badge className="bg-green-100 text-green-800">Payé</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence</span>
                  <span className="text-sm font-mono">{sessionId?.slice(0, 20)}...</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Confirmation par email</p>
                    <p className="text-sm text-blue-700">
                      Vous recevrez un email de confirmation avec tous les détails de votre achat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="flex-1 bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/courses">
                    <FileText className="w-4 h-4 mr-2" />
                    Voir les formations
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error/Expired state
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 border-2 border-red-300">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            {status === 'expired' ? 'Session expirée' : 'Erreur de paiement'}
          </h2>
          <p className="text-gray-600 mb-6">
            {status === 'expired' 
              ? 'Votre session de paiement a expiré. Veuillez réessayer.'
              : 'Une erreur est survenue lors de la vérification de votre paiement.'}
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
              <Link to="/courses">Réessayer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contacter le support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
