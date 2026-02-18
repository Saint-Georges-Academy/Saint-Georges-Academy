import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar as CalendarIcon, CreditCard, ShoppingCart, AlertCircle, Award, CheckCircle, ArrowLeft, FileText, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const certifications = [
  { id: 'ccna', name: 'CCNA (200-301)', description: 'Cisco Certified Network Associate', price: 630 },
  { id: 'cyberops', name: 'CyberOps Associate', description: 'Cisco Certified CyberOps Associate', price: 630 }
];

const CertificationCheckout = () => {
  const { toast } = useToast();
  const [selectedCert, setSelectedCert] = useState('');
  const [examDate, setExamDate] = useState(null);
  const [acceptRGPD, setAcceptRGPD] = useState(false);
  const [acceptCGV, setAcceptCGV] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const selectedCertification = certifications.find(c => c.id === selectedCert);
  const price = selectedCertification?.price || 630;

  const handleInputChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    });
  };

  // Minimum date is 14 days from now (to allow for registration)
  const minDate = addDays(new Date(), 14);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!selectedCert) {
      toast({
        title: "Certification requise",
        description: "Veuillez sélectionner une certification.",
        variant: "destructive"
      });
      return;
    }

    if (!examDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date d'examen.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptRGPD || !acceptCGV) {
      toast({
        title: "Acceptation requise",
        description: "Veuillez accepter la politique RGPD et les CGV.",
        variant: "destructive"
      });
      return;
    }

    // Validate all fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode'];
    for (const field of requiredFields) {
      if (!billingInfo[field]) {
        toast({
          title: "Champs requis",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
    }

    setPaymentProcessing(true);

    // Mock Stripe payment processing
    setTimeout(() => {
      const orderId = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const purchaseDate = new Date();
      
      const order = {
        orderId,
        certification: selectedCertification,
        examDate: format(examDate, 'dd/MM/yyyy', { locale: fr }),
        examDateFull: format(examDate, 'EEEE dd MMMM yyyy', { locale: fr }),
        billingInfo,
        purchaseDate: purchaseDate.toISOString(),
        purchaseDateFormatted: format(purchaseDate, 'dd/MM/yyyy à HH:mm', { locale: fr }),
        paymentMethod: 'Carte bancaire (Stripe)',
        subtotal: price,
        tva: 0, // TVA non applicable pour les formations
        total: price,
        status: 'Confirmé'
      };

      setOrderData(order);
      setOrderComplete(true);
      setPaymentProcessing(false);

      toast({
        title: "Paiement réussi !",
        description: `Votre examen ${selectedCertification.name} a été réservé.`,
      });
    }, 2500);
  };

  // Receipt/Confirmation view
  if (orderComplete && orderData) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f1f3d] mb-2">Paiement Confirmé !</h1>
            <p className="text-gray-600">Votre réservation d'examen a été enregistrée avec succès.</p>
          </div>

          {/* Receipt Card */}
          <Card className="border-2 border-[#d4af37] mb-6" data-testid="receipt-card">
            <CardHeader className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Reçu de Paiement
                  </CardTitle>
                  <p className="text-gray-300 mt-1">N° {orderData.orderId}</p>
                </div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
                  alt="Saint-Georges Academy"
                  className="h-12 w-auto object-contain bg-white rounded-lg p-1"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Organization Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Émetteur</h3>
                <p className="text-gray-700 text-sm">
                  <strong>Saint-Georges Academy</strong><br />
                  2 venelle des Amandiers<br />
                  86200 Loudun – France<br />
                  SIRET : 528 616 113 00023<br />
                  Tél : +33 (0)5 49 22 75 10
                </p>
              </div>

              {/* Client Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                  <p className="text-gray-700 text-sm">
                    {orderData.billingInfo.fullName}<br />
                    {orderData.billingInfo.address}<br />
                    {orderData.billingInfo.postalCode} {orderData.billingInfo.city}<br />
                    {orderData.billingInfo.country}<br />
                    {orderData.billingInfo.email}<br />
                    {orderData.billingInfo.phone}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Détails de la commande</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>Date d'achat :</strong> {orderData.purchaseDateFormatted}<br />
                    <strong>Référence :</strong> {orderData.orderId}<br />
                    <strong>Paiement :</strong> {orderData.paymentMethod}<br />
                    <strong>Statut :</strong> <span className="text-green-600 font-semibold">{orderData.status}</span>
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-b py-4">
                <h3 className="font-semibold text-gray-900 mb-3">Produit</h3>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{orderData.certification.name}</p>
                    <p className="text-sm text-gray-600">{orderData.certification.description}</p>
                    <p className="text-sm text-[#d4af37] font-medium mt-1">
                      Date d'examen prévue : {orderData.examDateFull}
                    </p>
                  </div>
                  <p className="font-bold text-lg">{orderData.total}€</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total HT</span>
                  <span>{orderData.subtotal}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVA</span>
                  <span>Non applicable (Art. 261-4-4°a du CGI)</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total TTC</span>
                  <span className="text-[#d4af37]">{orderData.total}€</span>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Informations importantes
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• L'examen se déroule dans un centre agréé PearsonVUE</li>
                  <li>• Vous recevrez un voucher d'examen par email sous 48h</li>
                  <li>• Le voucher est valable 1 an à compter de la date d'émission</li>
                  <li>• Munissez-vous d'une pièce d'identité valide le jour de l'examen</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.print()}
              className="bg-[#0f1f3d] hover:bg-[#1a3a5f] text-white"
              data-testid="print-receipt-btn"
            >
              <Download className="w-4 h-4 mr-2" />
              Imprimer le reçu
            </Button>
            <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d]">
              <Link to="/courses">
                Retour aux formations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/courses">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux formations
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
            <Award className="w-4 h-4 mr-1" />
            Certification Cisco
          </Badge>
          <h1 className="text-4xl font-bold text-[#0f1f3d] mb-2">Acheter un Examen de Certification</h1>
          <p className="text-gray-600">
            Réservez votre voucher d'examen Cisco officiel passé en centre agréé PearsonVUE.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleCheckout}>
              {/* Certification Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#d4af37]" />
                    Choisir la certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCert} onValueChange={setSelectedCert}>
                    <SelectTrigger className="w-full" data-testid="certification-select">
                      <SelectValue placeholder="Sélectionnez une certification" />
                    </SelectTrigger>
                    <SelectContent>
                      {certifications.map((cert) => (
                        <SelectItem key={cert.id} value={cert.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{cert.name}</span>
                            <span className="text-[#d4af37] font-bold ml-4">{cert.price}€</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCertification && (
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedCertification.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Exam Date Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#d4af37]" />
                    Choisir la date d'examen souhaitée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={examDate}
                      onSelect={setExamDate}
                      disabled={(date) => date < minDate || date.getDay() === 0}
                      className="rounded-md border"
                      locale={fr}
                    />
                  </div>
                  {examDate && (
                    <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-200" data-testid="selected-date-badge">
                      Date sélectionnée : {format(examDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                    </Badge>
                  )}
                  <p className="text-sm text-gray-600 mt-4">
                    * L'examen se déroulera dans un centre agréé PearsonVUE. La date finale sera confirmée par email.
                  </p>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card className="mb-6">
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
                        data-testid="fullname-input"
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
                        data-testid="email-input"
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
                        data-testid="phone-input"
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
                        data-testid="address-input"
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
                        data-testid="postalcode-input"
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
                        data-testid="city-input"
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
                        data-testid="country-input"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consent Checkboxes */}
              <Card className="border-2 border-blue-200 bg-blue-50 mb-6">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="rgpd"
                      checked={acceptRGPD}
                      onCheckedChange={setAcceptRGPD}
                      data-testid="rgpd-checkbox"
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="rgpd"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        J'accepte la politique de confidentialité (RGPD) *
                      </label>
                      <p className="text-sm text-gray-600">
                        <Link to="/rgpd" target="_blank" className="text-blue-600 underline hover:text-blue-800">
                          Consulter notre politique RGPD
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="cgv"
                      checked={acceptCGV}
                      onCheckedChange={setAcceptCGV}
                      data-testid="cgv-checkbox"
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="cgv"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        J'accepte les Conditions Générales de Vente (CGV) *
                      </label>
                      <p className="text-sm text-gray-600">
                        <Link to="/cgv" target="_blank" className="text-blue-600 underline hover:text-blue-800">
                          Consulter nos CGV
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold text-lg py-6"
                disabled={paymentProcessing || !selectedCert}
                data-testid="checkout-btn"
              >
                {paymentProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Payer {price}€
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-2 border-[#d4af37]">
              <CardHeader className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-t-lg">
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {selectedCertification ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Certification</p>
                      <p className="font-semibold text-gray-900">{selectedCertification.name}</p>
                      <p className="text-sm text-gray-600">{selectedCertification.description}</p>
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
                        <span className="text-gray-700">Examen Cisco</span>
                        <span className="font-semibold">{price}€</span>
                      </div>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-600">TVA</span>
                        <span>Non applicable</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                        <span>Total</span>
                        <span className="text-[#d4af37]">{price}€</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Sélectionnez une certification</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-amber-800">
                      <p className="font-medium mb-1">Paiement sécurisé</p>
                      <p>Simulation Stripe - Vos données sont protégées.</p>
                    </div>
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
