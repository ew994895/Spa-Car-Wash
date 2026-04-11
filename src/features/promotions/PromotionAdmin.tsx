import { useState, useEffect } from "react";
import { X, Plus, Trash2, Eye, EyeOff, Calendar, MapPin, BarChart3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Promotion {
  id: string;
  active: boolean;
  title: string;
  description: string;
  discount: string;
  expirationDate: string;
  promoCode: string;
  ctaText: string;
  ctaLink: string;
  ctaAction: 'book' | 'call' | 'scroll' | 'code' | 'custom';
  imageUrl?: string;
  placement: 'above-wash' | 'above-detailing' | 'above-membership' | 'floating-bottom' | 'hero-top' | 'header' | 'custom';
  customPosition?: { x: number; y: number };
  displayMode: 'section' | 'banner' | 'popup' | 'all';
  showBanner: boolean;
  showPopup: boolean;
  startDate?: string;
  clickCount: number;
  createdAt: string;
}

interface PromotionAdminProps {
  onClose: () => void;
}

const INITIAL_PROMOTION: Omit<Promotion, 'id' | 'clickCount' | 'createdAt'> = {
  active: false,
  title: "",
  description: "",
  discount: "",
  expirationDate: "",
  promoCode: "",
  ctaText: "Learn More",
  ctaLink: "",
  ctaAction: 'scroll',
  placement: 'above-wash',
  displayMode: 'section',
  showBanner: false,
  showPopup: false,
};

export function PromotionAdmin({ onClose }: PromotionAdminProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Promotion | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = () => {
    const stored = localStorage.getItem('spa_promotions');
    if (stored) {
      setPromotions(JSON.parse(stored));
    }
  };

  const savePromotions = (promos: Promotion[]) => {
    localStorage.setItem('spa_promotions', JSON.stringify(promos));
    setPromotions(promos);
    // Dispatch event for other components to react
    window.dispatchEvent(new Event('promotionsUpdated'));
  };

  const addPromotion = () => {
    const newPromo: Promotion = {
      ...INITIAL_PROMOTION,
      id: `promo-${Date.now()}`,
      clickCount: 0,
      createdAt: new Date().toISOString(),
    };
    setEditForm(newPromo);
    setEditingId(newPromo.id);
  };

  const savePromotion = () => {
    if (!editForm) return;
    
    const existing = promotions.find(p => p.id === editForm.id);
    let updated: Promotion[];
    
    if (existing) {
      updated = promotions.map(p => p.id === editForm.id ? editForm : p);
    } else {
      updated = [...promotions, editForm];
    }
    
    savePromotions(updated);
    setEditingId(null);
    setEditForm(null);
  };

  const deletePromotion = (id: string) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      savePromotions(promotions.filter(p => p.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    savePromotions(promotions.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const resetToDefault = () => {
    if (confirm('This will delete ALL promotions and reset to default. Continue?')) {
      localStorage.removeItem('spa_promotions');
      setPromotions([]);
      setShowResetConfirm(false);
      alert('Promotions reset to default successfully!');
    }
  };

  const getPlacementLabel = (placement: string) => {
    const labels: Record<string, string> = {
      'above-wash': 'Above Wash Packages',
      'above-detailing': 'Above Detailing Services',
      'above-membership': 'Above Membership Section',
      'floating-bottom': 'Floating Bottom Right',
      'hero-top': 'Top of Hero Section',
      'header': 'In Header',
      'custom': 'Custom Position'
    };
    return labels[placement] || placement;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="bg-gradient-to-br from-slate-900 to-blue-950 border-2 border-blue-500/30 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-slate-900 border-b-2 border-blue-500/30 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Promotion Manager</h2>
            <p className="text-blue-200">Create and manage special deals and promotions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(!showResetConfirm)}
              className="border-red-500/50 text-red-300 hover:bg-red-500/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {showResetConfirm && (
          <div className="bg-red-900/30 border-2 border-red-500/50 m-6 p-4 rounded-lg">
            <p className="text-red-200 mb-3">
              ⚠️ This will permanently delete all promotions and tracking data. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={resetToDefault}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Reset Everything
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(false)}
                className="border-blue-400 text-blue-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Add New Promotion Button */}
          <Button
            onClick={addPromotion}
            className="mb-6 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Promotion
          </Button>

          {/* Editing Form */}
          {editingId && editForm && (
            <Card className="bg-slate-800/50 border-2 border-yellow-500/30 p-6 mb-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                {promotions.find(p => p.id === editingId) ? 'Edit' : 'New'} Promotion
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="text-white mb-2 block font-semibold">Promotion Title *</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                    placeholder="e.g., Spring Detailing Special!"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-white mb-2 block font-semibold">Description *</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white resize-none"
                    rows={3}
                    placeholder="Describe the promotion details..."
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Discount Amount/Details *</label>
                  <input
                    type="text"
                    value={editForm.discount}
                    onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                    placeholder="e.g., $50 OFF or 20% OFF"
                  />
                </div>

                {/* Promo Code */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Promo Code (Optional)</label>
                  <input
                    type="text"
                    value={editForm.promoCode}
                    onChange={(e) => setEditForm({ ...editForm, promoCode: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                    placeholder="e.g., SPRING2026"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Start Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={editForm.startDate || ''}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Expiration Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={editForm.expirationDate}
                    onChange={(e) => setEditForm({ ...editForm, expirationDate: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                {/* CTA Text */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Button Text *</label>
                  <input
                    type="text"
                    value={editForm.ctaText}
                    onChange={(e) => setEditForm({ ...editForm, ctaText: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                    placeholder="e.g., Claim Offer, Book Now"
                  />
                </div>

                {/* CTA Action */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Button Action *</label>
                  <select
                    value={editForm.ctaAction}
                    onChange={(e) => setEditForm({ ...editForm, ctaAction: e.target.value as any })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="scroll">Scroll to Section</option>
                    <option value="book">Open Booking Form</option>
                    <option value="call">Call Phone Number</option>
                    <option value="code">Show Promo Code</option>
                    <option value="custom">Custom Link</option>
                  </select>
                </div>

                {/* CTA Link (if custom or scroll) */}
                {(editForm.ctaAction === 'custom' || editForm.ctaAction === 'scroll') && (
                  <div className="md:col-span-2">
                    <label className="text-white mb-2 block font-semibold">
                      {editForm.ctaAction === 'scroll' ? 'Section ID (e.g., #membership)' : 'Custom Link URL'}
                    </label>
                    <input
                      type="text"
                      value={editForm.ctaLink}
                      onChange={(e) => setEditForm({ ...editForm, ctaLink: e.target.value })}
                      className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                      placeholder={editForm.ctaAction === 'scroll' ? '#wash-packages' : 'https://...'}
                    />
                  </div>
                )}

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="text-white mb-2 block font-semibold">Image URL (Optional)</label>
                  <input
                    type="text"
                    value={editForm.imageUrl || ''}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                    placeholder="https://... (image URL for banner/popup)"
                  />
                </div>

                {/* Placement */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Button Placement *</label>
                  <select
                    value={editForm.placement}
                    onChange={(e) => setEditForm({ ...editForm, placement: e.target.value as any })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="above-wash">Above Wash Packages (High Conversion)</option>
                    <option value="above-detailing">Above Detailing Services (Premium Focus)</option>
                    <option value="above-membership">Above Membership Section (Recurring Revenue)</option>
                    <option value="floating-bottom">Floating Bottom Right (Always Visible)</option>
                    <option value="hero-top">Hero Section Top (First Impression)</option>
                    <option value="header">In Header (Maximum Visibility)</option>
                    <option value="custom">Custom Position (Advanced)</option>
                  </select>
                </div>

                {/* Display Mode */}
                <div>
                  <label className="text-white mb-2 block font-semibold">Primary Display Mode *</label>
                  <select
                    value={editForm.displayMode}
                    onChange={(e) => setEditForm({ ...editForm, displayMode: e.target.value as any })}
                    className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="section">Section on Page (Recommended)</option>
                    <option value="banner">Banner Only</option>
                    <option value="popup">Popup Only</option>
                    <option value="all">All Methods</option>
                  </select>
                </div>

                {/* Additional Display Options */}
                <div className="md:col-span-2 bg-slate-900/30 rounded-lg p-4 border border-blue-500/20">
                  <label className="text-white mb-3 block font-semibold">Additional Display Options</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-blue-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.showBanner}
                        onChange={(e) => setEditForm({ ...editForm, showBanner: e.target.checked })}
                        className="w-5 h-5"
                      />
                      Show as Top Banner
                    </label>
                    <label className="flex items-center gap-2 text-blue-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.showPopup}
                        onChange={(e) => setEditForm({ ...editForm, showPopup: e.target.checked })}
                        className="w-5 h-5"
                      />
                      Show Popup on Homepage Visit
                    </label>
                  </div>
                </div>

                {/* Custom Position (if selected) */}
                {editForm.placement === 'custom' && (
                  <div className="md:col-span-2 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-200 mb-3">
                      <strong>Custom Positioning:</strong> Use percentage values for responsive positioning
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white mb-2 block">X Position (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editForm.customPosition?.x || 0}
                          onChange={(e) => setEditForm({ 
                            ...editForm, 
                            customPosition: { 
                              x: parseInt(e.target.value), 
                              y: editForm.customPosition?.y || 0 
                            } 
                          })}
                          className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white mb-2 block">Y Position (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editForm.customPosition?.y || 0}
                          onChange={(e) => setEditForm({ 
                            ...editForm, 
                            customPosition: { 
                              x: editForm.customPosition?.x || 0,
                              y: parseInt(e.target.value)
                            } 
                          })}
                          className="w-full bg-slate-900/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={savePromotion}
                  disabled={!editForm.title || !editForm.description || !editForm.discount}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold"
                >
                  Save Promotion
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setEditForm(null);
                  }}
                  className="border-blue-400 text-blue-100"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Promotions List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              Active Promotions ({promotions.filter(p => p.active).length}/{promotions.length})
            </h3>

            {promotions.length === 0 && (
              <Card className="bg-slate-800/30 border-2 border-blue-500/20 p-8 text-center">
                <p className="text-blue-200 text-lg">
                  No promotions created yet. Click "Create New Promotion" to get started!
                </p>
              </Card>
            )}

            {promotions.map((promo) => (
              <Card key={promo.id} className="bg-slate-800/50 border-2 border-blue-500/20 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-white">{promo.title}</h4>
                      {promo.active ? (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Eye className="w-3 h-3" /> ACTIVE
                        </span>
                      ) : (
                        <span className="bg-slate-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> INACTIVE
                        </span>
                      )}
                    </div>
                    
                    <p className="text-blue-200 mb-3">{promo.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-slate-900/50 rounded p-2">
                        <p className="text-blue-300">Discount</p>
                        <p className="text-white font-bold">{promo.discount}</p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-2">
                        <p className="text-blue-300">Placement</p>
                        <p className="text-white font-bold text-xs">{getPlacementLabel(promo.placement)}</p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-2">
                        <p className="text-blue-300">Clicks</p>
                        <p className="text-white font-bold flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" /> {promo.clickCount}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-2">
                        <p className="text-blue-300">Expires</p>
                        <p className="text-white font-bold text-xs">
                          {promo.expirationDate ? new Date(promo.expirationDate).toLocaleDateString() : 'No expiration'}
                        </p>
                      </div>
                    </div>

                    {promo.startDate && new Date(promo.startDate) > new Date() && (
                      <div className="mt-3 bg-yellow-900/30 border border-yellow-500/30 rounded p-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-200 text-sm">
                          Scheduled to start: {new Date(promo.startDate).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => toggleActive(promo.id)}
                      variant="outline"
                      className={promo.active 
                        ? "border-green-500 text-green-300 hover:bg-green-500/20" 
                        : "border-blue-400 text-blue-300 hover:bg-blue-500/20"
                      }
                    >
                      {promo.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={() => {
                        setEditForm(promo);
                        setEditingId(promo.id);
                      }}
                      variant="outline"
                      className="border-blue-400 text-blue-300 hover:bg-blue-500/20"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deletePromotion(promo.id)}
                      variant="outline"
                      className="border-red-500 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
