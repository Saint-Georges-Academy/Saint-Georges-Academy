import React from 'react';
import { Link } from 'react-router-dom';
import { videoProduct } from '../data/mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  CheckCircle, 
  Video, 
  Clock, 
  TrendingUp, 
  Play,
  ShoppingCart,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Videos = () => {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Ajouté au panier",
      description: `${videoProduct.title} (${videoProduct.price}€)`,
    });
  };

  const videoCategories = [
    { title: 'Fondamentaux Réseau', count: 15, icon: '🌐' },
    { title: 'Adressage IP', count: 12, icon: '📡' },
    { title: 'Switching & VLANs', count: 18, icon: '🔀' },
    { title: 'Routing Dynamique', count: 14, icon: '🛣️' },
    { title: 'Sécurité Réseau', count: 10, icon: '🔒' },
    { title: 'Préparation Examen', count: 6, icon: '📝' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-2xl p-8 md:p-12 mb-8">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
            Produit autonome
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{videoProduct.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{videoProduct.description}</p>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-[#d4af37]" />
              <span>75 vidéos HD</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              <span>~40 heures de contenu</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
              <span>Progression suivie</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Ce qui est inclus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {videoProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Video Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Contenu des vidéos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {videoCategories.map((category, index) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:border-[#d4af37] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{category.icon}</span>
                        <Badge variant="outline" className="text-[#0f1f3d]">
                          {category.count} vidéos
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sample Video Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Aperçu d'une vidéo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-[#0f1f3d] ml-1" />
                    </div>
                    <p className="text-white text-lg font-semibold">Introduction au CCNA</p>
                    <p className="text-gray-300 text-sm">Vidéo de démonstration - 5:32</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Exemple de contenu disponible dans la collection complète. Qualité HD avec explications claires et exemples pratiques.
                </p>
              </CardContent>
            </Card>

            {/* Important Note */}
            <Card className="border-2 border-orange-300 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Important à noter</h3>
                    <p className="text-sm text-orange-800">{videoProduct.note}</p>
                    <p className="text-sm text-orange-800 mt-2">
                      Ce produit est complémentaire aux formations CCNA complètes. Pour un parcours certifiant avec accès NetAcad et sessions live, 
                      consultez nos <Link to="/courses" className="underline font-semibold hover:text-orange-900">formations CCNA</Link>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-2 border-[#d4af37]">
              <CardHeader className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-t-lg">
                <CardTitle className="text-2xl">Acheter maintenant</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Prix</div>
                  <div className="text-4xl font-bold text-[#d4af37]">{videoProduct.price}€</div>
                  <div className="text-sm text-gray-600 mt-1">Paiement unique</div>
                </div>

                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold text-lg py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Acheter l'accès
                </Button>

                <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Accès immédiat après paiement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Visionnage illimité pendant 12 mois</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mises à jour incluses</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Vous voulez plus ?</strong><br />
                    Combinez avec une formation CCNA complète pour maximiser vos chances de réussite.
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Link to="/courses?filter=CCNA">
                      Voir les formations CCNA
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
