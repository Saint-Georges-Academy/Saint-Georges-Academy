import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 border-2 border-amber-300">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-2">Paiement Annulé</h2>
          <p className="text-gray-600 mb-6">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-[#0f1f3d] mb-2">Besoin d'aide ?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Consultez notre FAQ pour les questions fréquentes</li>
              <li>• Contactez-nous si vous avez des problèmes de paiement</li>
              <li>• Nos formations sont finançables via OPCO et employeur</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
              <Link to="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux formations
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/faq">
                <HelpCircle className="w-4 h-4 mr-2" />
                Consulter la FAQ
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contact">Contacter le support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancel;
