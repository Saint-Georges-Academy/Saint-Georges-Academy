import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    company: ''
  });

  const from = location.state?.from?.pathname || '/dashboard';
  
  // Check if redirected from checkout
  const searchParams = new URLSearchParams(location.search);
  const isCheckoutRedirect = searchParams.get('redirect') === 'checkout';
  const checkoutReturnUrl = localStorage.getItem('checkout_return_url');

  const handleLoginSuccess = () => {
    toast.success('Connexion réussie !');
    // If redirected from checkout, go back to the course page
    if (isCheckoutRedirect && checkoutReturnUrl) {
      localStorage.removeItem('checkout_return_url');
      navigate(checkoutReturnUrl, { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await login(loginEmail, loginPassword);
      // Store user info for checkout
      if (response?.user) {
        localStorage.setItem('user_email', response.user.email || loginEmail);
        localStorage.setItem('user_name', `${response.user.first_name || ''} ${response.user.last_name || ''}`.trim());
      } else {
        localStorage.setItem('user_email', loginEmail);
      }
      handleLoginSuccess();
    } catch (error) {
      const message = error.response?.data?.detail || 'Erreur de connexion';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (registerData.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        email: registerData.email,
        password: registerData.password,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        phone: registerData.phone || null,
        company: registerData.company || null
      });
      // Store user info for checkout
      localStorage.setItem('user_email', registerData.email);
      localStorage.setItem('user_name', `${registerData.first_name} ${registerData.last_name}`.trim());
      toast.success('Compte créé avec succès !');
      // If redirected from checkout, go back to the course page
      if (isCheckoutRedirect && checkoutReturnUrl) {
        localStorage.removeItem('checkout_return_url');
        navigate(checkoutReturnUrl, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      const message = error.response?.data?.detail || 'Erreur lors de l\'inscription';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateRegisterField = (field, value) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#001a33] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
              alt="Saint-Georges Academy"
              className="h-20 w-auto mx-auto bg-white/95 rounded-xl p-3 shadow-lg"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Espace Étudiant</h1>
        </div>

        <Card className="border-0 shadow-2xl">
          {/* Checkout redirect notice */}
          {isCheckoutRedirect && (
            <div className="bg-amber-50 border-b border-amber-200 p-4 rounded-t-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-sm text-amber-900">
                  <strong className="block">Créez votre compte pour vous inscrire</strong>
                  <span className="text-amber-700">Un compte est nécessaire pour finaliser votre inscription à la formation.</span>
                </div>
              </div>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="login-tab">Connexion</TabsTrigger>
                <TabsTrigger value="register" data-testid="register-tab">Inscription</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Login Form */}
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                        data-testid="login-email-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        data-testid="login-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#0f1f3d] hover:text-[#d4af37]"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#0f1f3d] hover:bg-[#1a3a5f]"
                    disabled={loading}
                    data-testid="login-submit-btn"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" className="mt-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Prénom *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="first-name"
                          placeholder="Jean"
                          value={registerData.first_name}
                          onChange={(e) => updateRegisterField('first_name', e.target.value)}
                          className="pl-10"
                          required
                          data-testid="register-firstname-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nom *</Label>
                      <Input
                        id="last-name"
                        placeholder="Dupont"
                        value={registerData.last_name}
                        onChange={(e) => updateRegisterField('last_name', e.target.value)}
                        required
                        data-testid="register-lastname-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={registerData.email}
                        onChange={(e) => updateRegisterField('email', e.target.value)}
                        className="pl-10"
                        required
                        data-testid="register-email-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mot de passe * (min. 8 caractères)</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => updateRegisterField('password', e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={8}
                        data-testid="register-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) => updateRegisterField('confirmPassword', e.target.value)}
                        className="pl-10"
                        required
                        data-testid="register-confirm-password-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={registerData.phone}
                        onChange={(e) => updateRegisterField('phone', e.target.value)}
                        className="pl-10"
                        data-testid="register-phone-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        placeholder="Votre entreprise"
                        value={registerData.company}
                        onChange={(e) => updateRegisterField('company', e.target.value)}
                        className="pl-10"
                        data-testid="register-company-input"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]"
                    disabled={loading}
                    data-testid="register-submit-btn"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Créer mon compte
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-gray-400 text-sm mt-6">
          En vous inscrivant, vous acceptez nos{' '}
          <Link to="/cgv" className="text-[#d4af37] hover:underline">CGV</Link>
          {' '}et notre{' '}
          <Link to="/rgpd" className="text-[#d4af37] hover:underline">Politique de Confidentialité</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
