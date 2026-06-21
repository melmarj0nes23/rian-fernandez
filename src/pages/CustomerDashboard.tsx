import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

export function CustomerDashboardPage() {
  const { user, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    zip: '',
    country: ''
  });
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    if (user && !isAdmin) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            if (data.addresses) {
              setAddresses(data.addresses);
            }
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };
      fetchUserData();
    }
  }, [user, isAdmin]);

  if (loading) {
    return <div className="min-h-screen bg-[#F7F4EE]"></div>;
  }

  // If not logged in, or if admin (admins have their own dashboard)
  if (!user || isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      const addressToAdd = { ...newAddress, id: Date.now().toString() };
      const updatedAddresses = [...addresses, addressToAdd];
      
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { addresses: updatedAddresses }, { merge: true });
      
      setAddresses(updatedAddresses);
      setIsAddingAddress(false);
      setNewAddress({ name: '', street: '', city: '', zip: '', country: '' });
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to save address.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (idToRemove: string) => {
    try {
      const updatedAddresses = addresses.filter(a => a.id !== idToRemove);
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { addresses: updatedAddresses }, { merge: true });
      setAddresses(updatedAddresses);
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("Failed to delete address.");
    }
  };

  return (
    <div className="pt-32 md:pt-40 pb-32 min-h-screen bg-[#F7F4EE]">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#B8955A" }}>
              My Account
            </p>
            <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C0B09" }}>
              Welcome back
            </h1>
            <p className="mt-2 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>
              {user.email}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs tracking-[0.2em] uppercase px-6 py-3 transition-colors duration-300"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, border: "1px solid #0C0B09", color: "#0C0B09", background: "transparent" }}
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'addresses', label: 'Address Book' },
              { id: 'orders', label: 'Order History' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsAddingAddress(false);
                }}
                className="text-left py-3 px-4 text-xs tracking-[0.15em] uppercase transition-colors"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: activeTab === tab.id ? 400 : 300,
                  backgroundColor: activeTab === tab.id ? "#0C0B09" : "transparent",
                  color: activeTab === tab.id ? "#F7F4EE" : "#7A7468",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white p-8 md:p-12 shadow-sm">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl mb-6" style={{ fontFamily: "'Bodoni Moda', serif", color: "#0C0B09" }}>Account Details</h2>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>Email Address</label>
                    <input disabled value={user.email || ''} className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b opacity-60" style={{ borderBottomColor: "rgba(12,11,9,0.2)" }} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>Password</label>
                    <button className="text-xs tracking-[0.1em] uppercase underline" style={{ fontFamily: "Raleway, sans-serif", color: "#0C0B09" }}>Reset Password</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl mb-6" style={{ fontFamily: "'Bodoni Moda', serif", color: "#0C0B09" }}>Saved Addresses</h2>
                
                {!isAddingAddress ? (
                  <>
                    {addresses.length === 0 ? (
                      <p className="text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>You have no saved addresses yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {addresses.map(address => (
                          <div key={address.id} className="border p-6" style={{ borderColor: "rgba(12,11,9,0.1)" }}>
                            <p className="font-bold mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#0C0B09" }}>{address.name}</p>
                            <p className="text-sm text-[#7A7468] mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>{address.street}</p>
                            <p className="text-sm text-[#7A7468] mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>{address.city}, {address.zip}</p>
                            <p className="text-sm text-[#7A7468] mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>{address.country}</p>
                            <button 
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-xs tracking-[0.1em] uppercase underline" 
                              style={{ fontFamily: "Raleway, sans-serif", color: "#0C0B09" }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button 
                      onClick={() => setIsAddingAddress(true)}
                      className="mt-6 text-xs tracking-[0.2em] uppercase px-6 py-3 bg-[#0C0B09] text-[#F7F4EE]" 
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      Add New Address
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSaveAddress} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>Full Name</label>
                      <input required value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} className="w-full px-4 py-3 bg-transparent border outline-none focus:border-[#0C0B09] transition-colors" style={{ borderColor: "rgba(12,11,9,0.2)" }} />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>Street Address</label>
                      <input required value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-4 py-3 bg-transparent border outline-none focus:border-[#0C0B09] transition-colors" style={{ borderColor: "rgba(12,11,9,0.2)" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>City</label>
                        <input required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-4 py-3 bg-transparent border outline-none focus:border-[#0C0B09] transition-colors" style={{ borderColor: "rgba(12,11,9,0.2)" }} />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>ZIP Code</label>
                        <input required value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="w-full px-4 py-3 bg-transparent border outline-none focus:border-[#0C0B09] transition-colors" style={{ borderColor: "rgba(12,11,9,0.2)" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>Country</label>
                      <input required value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} className="w-full px-4 py-3 bg-transparent border outline-none focus:border-[#0C0B09] transition-colors" style={{ borderColor: "rgba(12,11,9,0.2)" }} />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button 
                        type="submit" 
                        disabled={savingAddress}
                        className="text-xs tracking-[0.2em] uppercase px-8 py-3 bg-[#0C0B09] text-[#F7F4EE] disabled:opacity-50" 
                        style={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        {savingAddress ? 'Saving...' : 'Save Address'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="text-xs tracking-[0.2em] uppercase px-8 py-3 border border-[#0C0B09] text-[#0C0B09]" 
                        style={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl mb-6" style={{ fontFamily: "'Bodoni Moda', serif", color: "#0C0B09" }}>Order History</h2>
                <p className="text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>You haven't placed any orders yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
