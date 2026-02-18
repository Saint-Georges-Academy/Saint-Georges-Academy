import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, CreditCard, ShoppingCart, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CertificationCheckout = ({ courseName, price = 630 }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examDate, setExamDate] = useState(null);
  const [acceptRGPD, setAcceptRGPD] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const handleInputChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!examDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date d'examen.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptRGPD) {
      toast({
        title: "Acceptation RGPD requise",
        description: "Veuillez accepter notre politique de confidentialité.",
        variant: "destructive"
      });
      return;
    }

    setPaymentProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      const orderId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const orderData = {
        orderId,
        courseName,
        product: 'Examen Certification Cisco',
        price,
        examDate: format(examDate, 'dd/MM/yyyy', { locale: fr }),
        billingInfo,
        purchaseDate: new Date().toISOString(),
        paymentMethod: 'Carte bancaire'
      };

      // Store order in localStorage for receipt
      localStorage.setItem('lastOrder', JSON.stringify(orderData));

      toast({
        title: "Paiement réussi !",
        description: "Votre examen a été réservé avec succès.",
      });

      // Redirect to receipt page
      navigate(`/receipt/${orderId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0f1f3d] mb-2">Réserver Examen de Certification</h1>
          <p className="text-gray-600">{courseName}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleCheckout}>
              {/* Exam Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#d4af37]" />
                    Choisir la date d'examen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={examDate}
                      onSelect={setExamDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                    />
                  </div>
                  {examDate && (
                    <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-200">
                      Date sélectionnée: {format(examDate, 'dd MMMM yyyy', { locale: fr })}
                    </Badge>
                  )}
                  <p className="text-sm text-gray-600 mt-4">
                    * L'examen se déroulera en centre agréé PearsonVUE
                  </p>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#d4af37]" />
                    Informations de facturation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={billingInfo.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={billingInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={billingInfo.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={billingInfo.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RGPD Consent */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="rgpd"
                      checked={acceptRGPD}
                      onCheckedChange={setAcceptRGPD}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="rgpd"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        J'accepte la politique de confidentialité (RGPD) *
                      </label>
                      <p className="text-sm text-gray-600">
                        Vos données personnelles seront traitées conformément au RGPD.{' '}
                        <a href="/rgpd" target="_blank" className="text-blue-600 underline hover:text-blue-800">
                          Consulter notre politique RGPD
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold text-lg py-6"
                disabled={paymentProcessing}
              >
                {paymentProcessing ? (
                  <span>Traitement en cours...</span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Payer {price}€
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-[#d4af37]">
              <CardHeader className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-t-lg">
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Formation</p>
                  <p className="font-semibold text-gray-900">{courseName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Produit</p>
                  <p className="font-semibold text-gray-900">Examen Certification Cisco</p>
                </div>

                {examDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date d'examen</p>
                    <p className="font-semibold text-gray-900">
                      {format(examDate, 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Sous-total</span>
                    <span className="font-semibold">{price}€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">TVA (20%)</span>
                    <span className="font-semibold">{(price * 0.2).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total TTC</span>
                    <span className="text-[#d4af37]">{(price * 1.2).toFixed(2)}€</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      Vous recevrez un reçu détaillé par email après le paiement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCheckout;
