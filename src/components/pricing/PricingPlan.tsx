
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from "sonner";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline';
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText = 'Get Started',
  buttonVariant = 'default'
}) => {
  const handleSubscribe = () => {
    toast.success(`You've selected the ${title} plan. This is a demo and no payment will be processed.`);
  };
  
  return (
    <Card className={`flex flex-col ${isPopular ? 'border-primary shadow-md relative' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-wealth-success shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={buttonVariant}
          onClick={handleSubscribe}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingPlan;
