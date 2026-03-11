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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast.success('Connexion réussie !');
      navigate(from, { replace: true });
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
      toast.success('Compte créé avec succès !');
      navigate(from, { replace: true });
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
