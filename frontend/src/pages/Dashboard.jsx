import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Video, User, Settings, LogOut, Clock, 
  CheckCircle, PlayCircle, ArrowRight, Award, Calendar,
  Loader2, ChevronRight, GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [summary, setSummary] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [videoAccess, setVideoAccess] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [summaryRes, coursesRes, videoRes, ordersRes] = await Promise.all([
        axios.get(`${API_URL}/api/dashboard/summary`),
        axios.get(`${API_URL}/api/dashboard/my-courses`),
        axios.get(`${API_URL}/api/dashboard/video-access`),
        axios.get(`${API_URL}/api/dashboard/orders`)
      ]);
      
      setSummary(summaryRes.data);
      setMyCourses(coursesRes.data);
      setVideoAccess(videoRes.data);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      toast.error('Erreur lors du chargement du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f1f3d]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0f1f3d]" data-testid="dashboard-welcome">
              Bienvenue, {user?.first_name} !
            </h1>
            <p className="text-gray-600 mt-1">Votre espace de formation personnalisé</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => setActiveSection('settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: GraduationCap },
            { id: 'courses', label: 'Mes Formations', icon: BookOpen },
            { id: 'videos', label: 'Vidéos', icon: Video },
            { id: 'orders', label: 'Commandes', icon: Clock },
            { id: 'settings', label: 'Profil', icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-[#0f1f3d] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid={`dashboard-tab-${tab.id}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Formations</p>
                      <p className="text-3xl font-bold">{summary?.total_courses || 0}</p>
                    </div>
                    <BookOpen className="h-10 w-10 text-[#d4af37]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-[#0f1f3d]">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#0f1f3d]/70 text-sm">Actives</p>
                      <p className="text-3xl font-bold">{summary?.active_courses || 0}</p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-[#0f1f3d]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Vidéos CCNA</p>
                      <p className="text-3xl font-bold text-[#0f1f3d]">
                        {videoAccess?.has_access ? '75' : '0'}
                      </p>
                    </div>
                    <Video className={`h-10 w-10 ${videoAccess?.has_access ? 'text-green-500' : 'text-gray-300'}`} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Commandes</p>
                      <p className="text-3xl font-bold text-[#0f1f3d]">{orders.length}</p>
                    </div>
                    <Award className="h-10 w-10 text-[#d4af37]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild className="h-auto py-6 bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                    <Link to="/courses" className="flex flex-col items-center gap-2">
                      <BookOpen className="h-6 w-6" />
                      <span>Explorer les Formations</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/videos" className="flex flex-col items-center gap-2">
                      <Video className="h-6 w-6" />
                      <span>Voir les Vidéos CCNA</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/contact" className="flex flex-col items-center gap-2">
                      <User className="h-6 w-6" />
                      <span>Contacter un Conseiller</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Course */}
            {summary?.recent_purchase && (
              <Card>
                <CardHeader>
                  <CardTitle>Dernière Formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0f1f3d] rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0f1f3d]">{summary.recent_purchase}</p>
                        <p className="text-sm text-gray-500">Accès actif</p>
                      </div>
                    </div>
                    <Button onClick={() => setActiveSection('courses')}>
                      Accéder <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {summary?.total_courses === 0 && !videoAccess?.has_access && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GraduationCap className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Commencez votre parcours
                  </h3>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    Vous n'avez pas encore de formation. Explorez notre catalogue pour démarrer votre carrière dans les réseaux et la cybersécurité.
                  </p>
                  <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
                    <Link to="/courses">
                      Explorer les Formations <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Courses Section */}
        {activeSection === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0f1f3d]">Mes Formations</h2>
              <Button asChild>
                <Link to="/courses">Voir le catalogue</Link>
              </Button>
            </div>

            {myCourses.length > 0 ? (
              <div className="grid gap-4">
                {myCourses.map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-lg flex items-center justify-center">
                            <BookOpen className="h-7 w-7 text-[#d4af37]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-[#0f1f3d]">{course.course_title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge variant={course.format === 'online' ? 'secondary' : 'default'}>
                                {course.format === 'online' ? 'En ligne' : 'Présentiel'}
                              </Badge>
                              {course.session && (
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {course.session}
                                </span>
                              )}
                              <Badge 
                                className={
                                  course.payment_status === 'paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                              >
                                {course.payment_status === 'paid' ? 'Actif' : 'En attente'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {course.payment_status === 'paid' && (
                          <Button className="bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                            Accéder au cours <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune formation</h3>
                  <p className="text-gray-500 mb-6">Vous n'avez pas encore de formation active.</p>
                  <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
                    <Link to="/courses">Découvrir les formations</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Videos Section */}
        {activeSection === 'videos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0f1f3d]">Vidéos CCNA</h2>

            {videoAccess?.has_access ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-[#d4af37]" />
                    75 Vidéos de Préparation CCNA
                  </CardTitle>
                  <CardDescription>
                    Accès valide jusqu'au {new Date(videoAccess.expires_at).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <PlayCircle className="h-16 w-16 text-[#0f1f3d] mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Accédez à toutes les vidéos pour préparer votre certification CCNA
                    </p>
                    <Button className="bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                      Accéder aux vidéos <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Video className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Accès non disponible</h3>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    Achetez les 75 vidéos de préparation CCNA pour un accès de 12 mois.
                  </p>
                  <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
                    <Link to="/videos">
                      Voir les vidéos – 150€ <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Orders Section */}
        {activeSection === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0f1f3d]">Historique des Commandes</h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0f1f3d]">{order.product_name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#0f1f3d]">{order.amount}€</p>
                          <Badge 
                            className={
                              order.payment_status === 'paid' 
                                ? 'bg-green-100 text-green-700' 
                                : order.payment_status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {order.payment_status === 'paid' ? 'Payé' : order.payment_status === 'pending' ? 'En attente' : 'Annulé'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune commande</h3>
                  <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0f1f3d]">Mon Profil</h2>

            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Prénom</label>
                    <p className="font-medium">{user?.first_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Nom</label>
                    <p className="font-medium">{user?.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Téléphone</label>
                    <p className="font-medium">{user?.phone || '—'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Entreprise</label>
                    <p className="font-medium">{user?.company || '—'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Compte créé le</label>
                    <p className="font-medium">
                      {new Date(user?.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier mes informations
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Changer mon mot de passe
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Need to import Lock icon
import { Lock } from 'lucide-react';

export default Dashboard;
