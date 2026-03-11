import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { 
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Search,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Building2,
  User,
  ClipboardList,
  TrendingUp,
  Filter
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminAdmissions = () => {
  const { user, token, isLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const statusLabels = {
    enquiry_received: { label: 'Demande reçue', color: 'bg-blue-100 text-blue-800' },
    needs_analysed: { label: 'Besoins analysés', color: 'bg-purple-100 text-purple-800' },
    prerequisites_reviewed: { label: 'Prérequis vérifiés', color: 'bg-indigo-100 text-indigo-800' },
    admission_approved: { label: 'Admission approuvée', color: 'bg-green-100 text-green-800' },
    admission_pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    admission_refused: { label: 'Refusée', color: 'bg-red-100 text-red-800' },
    quotation_sent: { label: 'Devis envoyé', color: 'bg-cyan-100 text-cyan-800' },
    agreement_sent: { label: 'Convention envoyée', color: 'bg-teal-100 text-teal-800' },
    terms_accepted: { label: 'Conditions acceptées', color: 'bg-emerald-100 text-emerald-800' },
    enrolment_confirmed: { label: 'Inscrit', color: 'bg-green-200 text-green-900' },
    training_access_sent: { label: 'Accès envoyé', color: 'bg-green-300 text-green-900' }
  };

  const typeLabels = {
    individual: { label: 'Individuel', icon: User },
    organisation: { label: 'Organisation', icon: Building2 },
    pre_enrolment: { label: 'Pré-inscription', icon: ClipboardList }
  };

  useEffect(() => {
    if (token && user?.role === 'admin') {
      fetchApplications();
      fetchStats();
    }
  }, [token, user, filterStatus, filterType]);

  const fetchApplications = async () => {
    try {
      let url = `${API_URL}/api/admissions/admin/applications?limit=100`;
      if (filterStatus) url += `&status=${filterStatus}`;
      if (filterType) url += `&type=${filterType}`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      }
    } catch (error) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admissions/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  };

  const fetchApplicationDetail = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/admissions/admin/applications/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedApp(data);
        setShowDetail(true);
      }
    } catch (error) {
      toast.error('Erreur de chargement du dossier');
    }
  };

  const updateStatus = async () => {
    if (!selectedApp || !newStatus) return;
    
    setUpdating(true);
    try {
      const response = await fetch(
        `${API_URL}/api/admissions/admin/applications/${selectedApp.application.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            new_status: newStatus,
            notes: statusNotes
          })
        }
      );

      if (response.ok) {
        toast.success('Statut mis à jour');
        setShowStatusDialog(false);
        setNewStatus('');
        setStatusNotes('');
        fetchApplications();
        fetchApplicationDetail(selectedApp.application.id);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const exportApplication = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/admissions/admin/applications/${id}/export`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Download as JSON
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dossier_${data.application.reference_number}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Dossier exporté');
      }
    } catch (error) {
      toast.error('Erreur d\'export');
    }
  };

  // Check auth
  if (isLoading) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">Chargement...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f1f3d] mb-2">
            Gestion des Admissions
          </h1>
          <p className="text-gray-600">
            Tableau de bord administratif - Suivi des demandes et inscriptions
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total demandes</p>
                    <p className="text-3xl font-bold text-[#0f1f3d]">{stats.total_applications}</p>
                  </div>
                  <FileText className="w-10 h-10 text-[#d4af37]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">En attente</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending_review}</p>
                  </div>
                  <Clock className="w-10 h-10 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">30 derniers jours</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.recent_30_days}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Inscrits</p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.by_status?.enrolment_confirmed || 0}
                    </p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Filtres:</span>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  {Object.entries(statusLabels).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  {Object.entries(typeLabels).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => { fetchApplications(); fetchStats(); }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-[#d4af37]" />
              Demandes ({applications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Chargement...</div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Aucune demande trouvée</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Réf.</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {applications.map((app) => {
                      const TypeIcon = typeLabels[app.type]?.icon || FileText;
                      const statusInfo = statusLabels[app.status] || { label: app.status, color: 'bg-gray-100 text-gray-800' };
                      
                      return (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono">{app.reference_number}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{typeLabels[app.type]?.label || app.type}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {app.first_name && app.last_name 
                              ? `${app.first_name} ${app.last_name}`
                              : app.organisation_name || app.contact_name || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {app.email || app.contact_email}
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(app.created_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => fetchApplicationDetail(app.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => exportApplication(app.id)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={showDetail} onOpenChange={setShowDetail}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Dossier {selectedApp?.application?.reference_number}
              </DialogTitle>
              <DialogDescription>
                Détails complets et historique du dossier
              </DialogDescription>
            </DialogHeader>
            
            {selectedApp && (
              <div className="space-y-6">
                {/* Status & Actions */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Statut actuel:</span>
                    <Badge className={statusLabels[selectedApp.application.status]?.color || 'bg-gray-100'}>
                      {statusLabels[selectedApp.application.status]?.label || selectedApp.application.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowStatusDialog(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier statut
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => exportApplication(selectedApp.application.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    {selectedApp.application.first_name && (
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium">{selectedApp.application.first_name} {selectedApp.application.last_name}</p>
                      </div>
                    )}
                    {selectedApp.application.organisation_name && (
                      <div>
                        <p className="text-sm text-gray-500">Organisation</p>
                        <p className="font-medium">{selectedApp.application.organisation_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedApp.application.email || selectedApp.application.contact_email}</p>
                    </div>
                    {selectedApp.application.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium">{selectedApp.application.phone}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Needs Analysis */}
                {selectedApp.application.needs_analysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Analyse des besoins</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(selectedApp.application.needs_analysis).map(([key, value]) => (
                        value && key !== 'submitted_at' && (
                          <div key={key}>
                            <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                            <p className="text-sm">{value}</p>
                          </div>
                        )
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Prerequisite Review */}
                {selectedApp.application.prerequisite_review && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-800">Revue des prérequis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Statut:</strong> {selectedApp.application.prerequisite_review.status}</p>
                      <p><strong>Réviseur:</strong> {selectedApp.application.prerequisite_review.reviewer_name}</p>
                      {selectedApp.application.prerequisite_review.comments && (
                        <p><strong>Commentaires:</strong> {selectedApp.application.prerequisite_review.comments}</p>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Audit Trail */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historique (Audit Trail)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApp.application.audit_trail?.map((entry, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm border-l-2 border-gray-200 pl-4">
                          <div className="flex-1">
                            <p className="font-medium">{entry.action}</p>
                            <p className="text-gray-500">Par: {entry.actor}</p>
                            {entry.details && <p className="text-gray-600 text-xs">{entry.details}</p>}
                          </div>
                          <p className="text-gray-400 text-xs">
                            {new Date(entry.timestamp).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Notes */}
                {selectedApp.application.admin_notes?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notes internes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedApp.application.admin_notes.map((note, idx) => (
                          <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm">{note.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {note.author} - {new Date(note.created_at).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Evidence Summary */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Résumé des preuves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        {selectedApp.application.needs_analysis ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="text-sm">Analyse des besoins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedApp.application.prerequisite_review ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="text-sm">Prérequis validés</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedApp.application.gdpr_consent ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="text-sm">Consentement RGPD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedApp.application.cgv_accepted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="text-sm">CGV acceptées</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Status Update Dialog */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le statut</DialogTitle>
              <DialogDescription>
                Mettre à jour le statut du dossier {selectedApp?.application?.reference_number}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nouveau statut</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes (optionnel)</Label>
                <Textarea
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Ajouter des notes sur ce changement..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={updateStatus} disabled={!newStatus || updating}>
                  {updating ? 'Mise à jour...' : 'Confirmer'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAdmissions;
