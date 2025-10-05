import React, { useState } from 'react';
import { ShoppingCart, Calculator, CheckCircle, TrendingUp, Package, Users, ArrowRight, Plus, Minus, AlertCircle, Download, Menu, X } from 'lucide-react';

const StaplePayApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cartItems, setCartItems] = useState([]);
  const [calculatorData, setCalculatorData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userVerified, setUserVerified] = useState(false);

  // Sample products
  const products = [
    { id: 1, name: 'Premium Rice (50kg)', retail: 85000, wholesale: 68000, category: 'Grains', image: '🌾', minQty: 5 },
    { id: 2, name: 'Vegetable Oil (25L)', retail: 65000, wholesale: 52000, category: 'Oils', image: '🛢️', minQty: 4 },
    { id: 3, name: 'Beans (25kg)', retail: 42000, wholesale: 33600, category: 'Grains', image: '🫘', minQty: 4 },
    { id: 4, name: 'Tomato Paste (24 tins)', retail: 28000, wholesale: 22400, category: 'Condiments', image: '🥫', minQty: 3 },
    { id: 5, name: 'Garri (50kg)', retail: 38000, wholesale: 30400, category: 'Grains', image: '🌾', minQty: 4 },
    { id: 6, name: 'Palm Oil (25L)', retail: 72000, wholesale: 57600, category: 'Oils', image: '🛢️', minQty: 4 },
  ];

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty }]);
    }
  };

  const updateCartQty = (productId, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(item.minQty, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity >= item.minQty));
  };

  const calculateTotals = () => {
    const retailTotal = cartItems.reduce((sum, item) => sum + (item.retail * item.quantity), 0);
    const wholesaleTotal = cartItems.reduce((sum, item) => sum + (item.wholesale * item.quantity), 0);
    const savings = retailTotal - wholesaleTotal;
    return { retailTotal, wholesaleTotal, savings };
  };

  const calculatePayments = (salary, months) => {
    const { wholesaleTotal } = calculateTotals();
    const monthlyPayment = wholesaleTotal / months;
    const salaryPercentage = (monthlyPayment / salary) * 100;
    return { monthlyPayment, salaryPercentage };
  };

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #f0fdfa)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-100 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StaplePay</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button className="text-white-700 hover:text-teal-600 font-medium">How it works</button>
              <button className="text-white-700 hover:text-teal-600 font-medium">Products</button>
              <button className="text-white-700 hover:text-teal-600 font-medium">For Employers</button>
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('onboarding')} className="text-white-700 hover:text-teal-600 font-medium">Sign In</button>
              <button onClick={() => setCurrentPage('onboarding')} className="text-white px-6 py-2 rounded-lg font-semibold" style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}>
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🎉 Now live in Lagos, Abuja & Port Harcourt
            </div>
            <h1 className="text-5xl font-bold text-gray-600 mb-6 leading-tight">
              Stock smart. <br/>
              <span style={{ background: 'linear-gradient(to right, #0d9488, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Do more with your income.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Buy staples at wholesale prices. Pay across paydays. Save up to 35% on every order with zero upfront cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              { <button onClick={() => setCurrentPage('/calculator')} className="text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center" style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}>
                Calculate Your Savings <ArrowRight className="ml-2 w-5 h-5" />
              </button> }
              <button onClick={() => setCurrentPage('/catalog')} className="bg-white text-teal-700 border-2 border-teal-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50">
                Browse Products
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div>
                <div className="text-3xl font-bold text-teal-600">₦2.4B+</div>
                <div className="text-sm text-gray-600">Total savings delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">15,000+</div>
                <div className="text-sm text-gray-600">Happy customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">500+</div>
                <div className="text-sm text-gray-600">Partner companies</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Quick Savings Calculator</h3>
                <Calculator className="w-5 h-5 text-teal-600" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Your Monthly Salary</label>
                  <input type="text" placeholder="₦250,000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Order Value</label>
                  <input type="text" placeholder="₦150,000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>

                <div className="p-6 rounded-xl border border-green-200" style={{ background: 'linear-gradient(to right, #f0fdf4, #f0fdfa)' }}>
                  <div className="text-sm text-gray-600 mb-1">You could save</div>
                  <div className="text-4xl font-bold text-green-600">₦38,725</div>
                  <div className="text-sm text-gray-600 mt-2">with wholesale pricing</div>
                </div>

                <button onClick={() => setCurrentPage('/calculator')} className="w-full text-white py-4 rounded-xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #0f766e)' }}>
                  See Full Breakdown
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                ⚡ People like you save ₦42,300 on average
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How StaplePay Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to smarter shopping</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, #14b8a6, #0d9488)' }}>
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Calculate & Choose</h3>
              <p className="text-gray-600">Pick your staples, see instant wholesale savings, and choose how many months to spread the cost.</p>
            </div>

            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, #f97316, #ea580c)' }}>
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Get Verified</h3>
              <p className="text-gray-600">Quick BVN check and payslip upload. We verify with your employer and approve your credit limit instantly.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, #22c55e, #16a34a)' }}>
                <Package className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Receive & Repay</h3>
              <p className="text-gray-600">Your order arrives within 48 hours. Payments auto-deduct from salary — hassle-free and transparent.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Calculator Page
  const CalculatorPage = () => {
    const [salary, setSalary] = useState<number>(250000);
    const [months, setMonths] = useState(3);
    const totals = calculateTotals();
    const payments = calculatePayments(salary, months);

    return (
      <div className="min-h-screen w-full bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={() => setCurrentPage('/landing')} className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StaplePay</span>
              </button>
              <button onClick={() => setCurrentPage('/catalog')} className="text-white px-6 py-2 rounded-lg font-semibold" style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}>
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                Cart ({cartItems.length})
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">See how much you'll save</h1>
            <p className="text-xl text-gray-600">Buying wholesale, paying across paydays.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">See how much you could save with wholesale pricing</p>
                  <button onClick={() => setCurrentPage('catalog')} className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700">
                    Browse Products
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          
                          <div className="mt-4 flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                              <button onClick={() => updateCartQty(item.id, -1)} className="text-gray-600 hover:text-teal-600">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="text-gray-600 hover:text-teal-600">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-500">Min qty: {item.minQty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-400 line-through">₦{(item.retail * item.quantity).toLocaleString()}</div>
                        <div className="text-2xl font-bold text-teal-600">₦{(item.wholesale * item.quantity).toLocaleString()}</div>
                        <div className="text-sm text-green-600 font-semibold mt-1">
                          Save ₦{((item.retail - item.wholesale) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right: Calculator Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Calculator</h3>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Your Monthly Salary</label>
                  <input 
                    type="number" 
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4" 
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Payment Period</label>
                  <select 
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6"
                  >
                    <option value={2}>2 months</option>
                    <option value={3}>3 months</option>
                    <option value={4}>4 months</option>
                    <option value={6}>6 months</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Retail Total:</span>
                    <span className="line-through">₦{totals.retailTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-lg mb-2">
                    <span>Wholesale Total:</span>
                    <span>₦{totals.wholesaleTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-green-200 mb-6" style={{ background: 'linear-gradient(to right, #f0fdf4, #f0fdfa)' }}>
                  <div className="text-sm text-gray-600 mb-1">You save</div>
                  <div className="text-3xl font-bold text-green-600">₦{totals.savings.toLocaleString()}</div>
                </div>

                {cartItems.length > 0 && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-600 mb-2">Monthly Payment</div>
                      <div className="text-2xl font-bold text-gray-900">₦{Math.round(payments.monthlyPayment).toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mt-1">for {months} months</div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Salary Impact</span>
                        <span className={`font-bold ${payments.salaryPercentage <= 30 ? 'text-green-600' : payments.salaryPercentage <= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                          {payments.salaryPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${payments.salaryPercentage <= 30 ? 'bg-green-500' : payments.salaryPercentage <= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(payments.salaryPercentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {payments.salaryPercentage <= 30 ? '✓ Healthy budget range' : payments.salaryPercentage <= 50 ? '⚠ Moderate commitment' : '⚠ Consider longer term'}
                      </div>
                    </div>

                    <button onClick={() => setCurrentPage('checkout')} className="w-full text-white py-4 rounded-xl font-bold" style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}>
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Product Catalog Page
  const CatalogPage = () => (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => setCurrentPage('landing')} className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StaplePay</span>
            </button>
            <button onClick={() => setCurrentPage('calculator')} className="text-white px-6 py-2 rounded-lg font-semibold" style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}>
              <ShoppingCart className="w-5 h-5 inline mr-2" />
              Cart ({cartItems.length})
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Wholesale Catalog</h1>
          <p className="text-xl text-gray-600">Premium staples at unbeatable prices</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <div className="p-12 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #ccfbf1, #fed7aa)' }}>
                <div className="text-7xl">{product.image}</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    Save {Math.round(((product.retail - product.wholesale) / product.retail) * 100)}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 line-through">₦{product.retail.toLocaleString()}</div>
                  <div className="text-2xl font-bold text-teal-600">₦{product.wholesale.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Min order: {product.minQty} units</div>
                </div>

                <button 
                  onClick={() => {
                    addToCart(product, product.minQty);
                    setCurrentPage('calculator');
                  }}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Onboarding Page
  const OnboardingPage = () => (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(to bottom right, #0d9488, #0f766e)' }}>
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Verified</h2>
          <p className="text-gray-600">Quick setup to unlock your credit limit</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">BVN (Bank Verification Number)</label>
            <input type="text" placeholder="22123456789" maxLength="11" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Company Email</label>
            <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Upload Recent Payslip</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG (max 5MB)</p>
            </div>
          </div>

          <button 
            onClick={() => {
              setUserVerified(true);
              setCurrentPage('dashboard');
            }}
            className="w-full text-white py-4 rounded-xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #0f766e)' }}
          >
            Verify Account
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            🔒 Your data is encrypted and secure. We never share your information.
          </p>
        </div>
      </div>
    </div>
  );

  // Checkout Page
  const CheckoutPage = () => {
    const [agreed, setAgreed] = useState(false);
    const totals = calculateTotals();
    const payments = calculatePayments(250000, 3);

    return (
      <div className="min-h-screen w-full bg-gray-50">
        <header className="bg-white border-b border-gray-200 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={() => setCurrentPage('calculator')} className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StaplePay</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Confirm Your Order</h1>
            <p className="text-xl text-gray-600">Review and authorize payroll deduction</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{item.image}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-teal-600">₦{(item.wholesale * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Schedule</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(month => (
                    <div key={month} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Month {month}</div>
                        <div className="text-sm text-gray-500">Deducted from salary</div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        ₦{Math.round(totals.wholesaleTotal / 3).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="rounded-xl p-6 border-2 border-orange-200" style={{ background: 'linear-gradient(to bottom right, #fff7ed, white)' }}>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      I authorize <strong>StaplePay</strong> to request salary deduction for this approved order. I understand that monthly payments of <strong>₦{Math.round(payments.monthlyPayment).toLocaleString()}</strong> will be automatically deducted from my salary for 3 months, starting from my next pay cycle.
                    </label>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentPage('success')}
                disabled={!agreed}
                className={`w-full py-4 rounded-xl font-bold text-lg ${
                  agreed 
                    ? 'text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                style={agreed ? { background: 'linear-gradient(to right, #f97316, #ea580c)' } : {}}
              >
                {agreed ? 'Confirm & Authorize Deduction' : 'Please accept terms to continue'}
              </button>
            </div>

            {/* Summary Card */}
            <div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Retail Price:</span>
                    <span className="line-through">₦{totals.retailTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Wholesale Price:</span>
                    <span>₦{totals.wholesaleTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-bold text-lg">
                    <span>You Save:</span>
                    <span>₦{totals.savings.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="text-2xl font-bold text-gray-900">₦{Math.round(payments.monthlyPayment).toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500 text-right">for 3 months</div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex items-center text-teal-700 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Expected delivery: 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success Page
  const SuccessPage = () => (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #f0fdfa)' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-12 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(to bottom right, #22c55e, #16a34a)' }}>
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">Nice one — you're verified. Your credit limit is ₦500,000.</p>

        <div className="rounded-xl p-6 mb-8 border border-teal-200" style={{ background: 'linear-gradient(to right, #f0fdfa, #f0fdf4)' }}>
          <div className="text-sm text-gray-600 mb-2">You saved</div>
          <div className="text-5xl font-bold text-green-600 mb-2">₦{calculateTotals().savings.toLocaleString()}</div>
          <div className="text-gray-600">on this order with wholesale pricing</div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Order Total</div>
            <div className="text-2xl font-bold text-gray-900">₦{calculateTotals().wholesaleTotal.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
            <div className="text-2xl font-bold text-gray-900">₦{Math.round(calculateTotals().wholesaleTotal / 3).toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Delivery Time</div>
            <div className="text-2xl font-bold text-gray-900">48hrs</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => setCurrentPage('dashboard')} className="text-white px-8 py-4 rounded-xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #0f766e)' }}>
            Go to Dashboard
          </button>
          <button className="bg-white text-teal-700 border-2 border-teal-600 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          📱 We'll send you tracking updates via SMS and email
        </p>
      </div>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => {
    const totals = calculateTotals();
    
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <header className="bg-white border-b border-gray-200 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0d9488, #115e59)' }}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StaplePay</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-teal-600 font-medium">Orders</button>
                <button className="text-gray-700 hover:text-teal-600 font-medium">Payments</button>
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 font-bold">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
            <p className="text-xl text-gray-600">Track your orders and savings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(to bottom right, #22c55e, #16a34a)' }}>
              <div className="text-sm opacity-90 mb-2">Total Savings</div>
              <div className="text-3xl font-bold">₦{totals.savings.toLocaleString()}</div>
              <div className="text-sm opacity-75 mt-2">↑ 35% vs retail</div>
            </div>

            <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(to bottom right, #14b8a6, #0d9488)' }}>
              <div className="text-sm opacity-90 mb-2">Active Orders</div>
              <div className="text-3xl font-bold">1</div>
              <div className="text-sm opacity-75 mt-2">Arriving in 2 days</div>
            </div>

            <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(to bottom right, #f97316, #ea580c)' }}>
              <div className="text-sm opacity-90 mb-2">Credit Available</div>
              <div className="text-3xl font-bold">₦350K</div>
              <div className="text-sm opacity-75 mt-2">of ₦500K limit</div>
            </div>

            <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(to bottom right, #a855f7, #9333ea)' }}>
              <div className="text-sm opacity-90 mb-2">Next Payment</div>
              <div className="text-3xl font-bold">₦50K</div>
              <div className="text-sm opacity-75 mt-2">Nov 30, 2025</div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-bold text-gray-900">Order #12345</span>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">In Transit</span>
                    </div>
                    <div className="text-sm text-gray-600">Placed Oct 15, 2025 • {cartItems.length} items</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">₦{totals.wholesaleTotal.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Saved ₦{totals.savings.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {cartItems.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white text-lg">
                        {item.image}
                      </div>
                    ))}
                    {cartItems.length > 4 && (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white text-xs font-bold text-gray-600">
                        +{cartItems.length - 4}
                      </div>
                    )}
                  </div>
                  <button className="text-teal-600 font-semibold hover:text-teal-700 flex items-center">
                    Track Order <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-6 hover:bg-gray-50 opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-bold text-gray-900">Order #12344</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Delivered</span>
                    </div>
                    <div className="text-sm text-gray-600">Delivered Sep 28, 2025 • 4 items</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₦120,500</div>
                    <div className="text-sm text-green-600">Saved ₦31,200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Payments</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { month: 'November 2025', amount: Math.round(totals.wholesaleTotal / 3), status: 'pending', date: 'Nov 30' },
                  { month: 'December 2025', amount: Math.round(totals.wholesaleTotal / 3), status: 'scheduled', date: 'Dec 31' },
                  { month: 'January 2026', amount: Math.round(totals.wholesaleTotal / 3), status: 'scheduled', date: 'Jan 31' },
                ].map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        payment.status === 'pending' ? 'bg-orange-100' : 'bg-gray-200'
                      }`}>
                        <span className={`font-bold ${
                          payment.status === 'pending' ? 'text-orange-600' : 'text-gray-500'
                        }`}>{idx + 1}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{payment.month}</div>
                        <div className="text-sm text-gray-600">Due {payment.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">₦{payment.amount.toLocaleString()}</div>
                      <div className={`text-xs font-semibold ${
                        payment.status === 'pending' ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        {payment.status === 'pending' ? 'Next payment' : 'Scheduled'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA to shop again */}
          <div className="mt-8 rounded-xl p-8 text-white text-center" style={{ background: 'linear-gradient(to right, #0d9488, #f97316)' }}>
            <h3 className="text-2xl font-bold mb-3">Ready for your next order?</h3>
            <p className="text-teal-50 mb-6">You have ₦350,000 available credit</p>
            <button onClick={() => setCurrentPage('catalog')} className="bg-white text-teal-700 px-8 py-4 rounded-xl font-bold hover:shadow-xl">
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Router
  const renderPage = () => {
    switch(currentPage) {
      case 'landing': return <LandingPage />;
      case 'calculator': return <CalculatorPage />;
      case 'catalog': return <CatalogPage />;
      case 'onboarding': return <OnboardingPage />;
      case 'checkout': return <CheckoutPage />;
      case 'success': return <SuccessPage />;
      case 'dashboard': return <DashboardPage />;
      default: return <LandingPage />;
    }
  };

  return renderPage();
};

// Missing Upload component
const Upload = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export default StaplePayApp;
