
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Check, CreditCard, Package, ShoppingBag, Truck } from 'lucide-react';

type OrderProcessingStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

type OrderProcessingProps = {
  cartItems: Array<{
    id: string;
    name: string;
    price: number | string;
    quantity: number;
    image?: string;
  }>;
  onClose: () => void;
  onOrderComplete: () => void;
};

const OrderProcessing = ({ cartItems, onClose, onOrderComplete }: OrderProcessingProps) => {
  const [currentStep, setCurrentStep] = useState<OrderProcessingStep>('cart');
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 'cart') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('confirmation');
        toast.success('Payment processed successfully!');
      }, 2000);
    }
    else if (currentStep === 'confirmation') {
      onOrderComplete();
      onClose();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'shipping') setCurrentStep('cart');
    else if (currentStep === 'payment') setCurrentStep('shipping');
  };

  const isShippingValid = () => {
    return (
      shippingDetails.name.trim() !== '' &&
      shippingDetails.address.trim() !== '' &&
      shippingDetails.city.trim() !== '' &&
      shippingDetails.state.trim() !== '' &&
      shippingDetails.zipCode.trim() !== ''
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-6">
        <StepButton 
          isActive={currentStep === 'cart'} 
          isPast={['shipping', 'payment', 'confirmation'].includes(currentStep)}
          icon={<ShoppingBag size={16} />} 
          label="Cart" 
        />
        <StepButton 
          isActive={currentStep === 'shipping'} 
          isPast={['payment', 'confirmation'].includes(currentStep)}
          icon={<Package size={16} />} 
          label="Shipping" 
        />
        <StepButton 
          isActive={currentStep === 'payment'} 
          isPast={['confirmation'].includes(currentStep)}
          icon={<CreditCard size={16} />} 
          label="Payment" 
        />
        <StepButton 
          isActive={currentStep === 'confirmation'} 
          isPast={[].includes(currentStep)}
          icon={<Check size={16} />} 
          label="Confirmation" 
        />
      </div>
    );
  };

  const renderCartStep = () => (
    <>
      <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            {item.image && (
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              {typeof item.price === 'string' ? item.price : `₹${item.price.toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{cartTotal.toFixed(2)}</span>
      </div>
    </>
  );

  const renderShippingStep = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={shippingDetails.name}
          onChange={handleShippingChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingDetails.address}
          onChange={handleShippingChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingDetails.state}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingDetails.zipCode}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingDetails.country}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Truck size={20} className="text-closetx-teal mr-2" />
        <p className="text-sm">Estimated delivery: 3-5 business days</p>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
        <input
          type="text"
          id="cardName"
          className="w-full p-2 border rounded"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiration Date</label>
          <input
            type="text"
            id="expiry"
            className="w-full p-2 border rounded"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            id="cvv"
            className="w-full p-2 border rounded"
            placeholder="123"
          />
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Order Summary</h4>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>₹99.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{(cartTotal + 99 + cartTotal * 0.18).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center py-4">
      <div className="bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Check size={32} />
      </div>
      <h3 className="text-xl font-bold mb-2">Order Confirmed!</h3>
      <p className="mb-4">Your order has been placed successfully.</p>
      <p className="text-gray-500">Order ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
      <p className="text-gray-500 mb-6">A confirmation email has been sent.</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center">
          <Truck size={18} className="mr-2" /> Shipping Details
        </h4>
        <p className="text-sm">{shippingDetails.name}</p>
        <p className="text-sm">{shippingDetails.address}</p>
        <p className="text-sm">
          {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
        </p>
        <p className="text-sm">{shippingDetails.country}</p>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {currentStep === 'cart' && 'Your Cart'}
          {currentStep === 'shipping' && 'Shipping Information'}
          {currentStep === 'payment' && 'Payment Details'}
          {currentStep === 'confirmation' && 'Order Confirmation'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}
        {currentStep === 'cart' && renderCartStep()}
        {currentStep === 'shipping' && renderShippingStep()}
        {currentStep === 'payment' && renderPaymentStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep !== 'cart' && currentStep !== 'confirmation' ? (
          <Button variant="outline" onClick={handlePreviousStep}>
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onClose}>
            {currentStep === 'confirmation' ? 'Close' : 'Cancel'}
          </Button>
        )}
        <Button 
          onClick={handleNextStep}
          disabled={(currentStep === 'shipping' && !isShippingValid()) || isProcessing}
          className="bg-closetx-teal hover:bg-closetx-teal/90"
        >
          {isProcessing ? 'Processing...' : (
            currentStep === 'cart' ? 'Proceed to Shipping' :
            currentStep === 'shipping' ? 'Proceed to Payment' :
            currentStep === 'payment' ? 'Place Order' :
            'Continue Shopping'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface StepButtonProps {
  isActive: boolean;
  isPast: boolean;
  icon: React.ReactNode;
  label: string;
}

const StepButton = ({ isActive, isPast, icon, label }: StepButtonProps) => (
  <div className="flex flex-col items-center">
    <div 
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isActive ? 'bg-closetx-teal text-white' : 
        isPast ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
      }`}
    >
      {icon}
    </div>
    <span className={`text-xs mt-1 ${isActive ? 'text-closetx-teal font-medium' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

export default OrderProcessing;
