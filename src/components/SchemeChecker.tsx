
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Check, Award, BookOpen, ChevronRight } from 'lucide-react';

const SchemeChecker = () => {
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-health-blue">Government Scheme Eligibility</h1>
        <p className="text-gray-600">Check eligibility for health and welfare schemes</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-health-blue flex items-center">
                <Search size={20} className="mr-2" /> Eligibility Checker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter age" />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup defaultValue="female" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="gender-female" />
                        <Label htmlFor="gender-female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="gender-male" />
                        <Label htmlFor="gender-male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="gender-other" />
                        <Label htmlFor="gender-other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select defaultValue="kamrup">
                      <SelectTrigger id="district">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kamrup">Kamrup</SelectItem>
                        <SelectItem value="sonitpur">Sonitpur</SelectItem>
                        <SelectItem value="dibrugarh">Dibrugarh</SelectItem>
                        <SelectItem value="cachar">Cachar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annual-income">Annual Household Income</Label>
                    <Select defaultValue="low">
                      <SelectTrigger id="annual-income">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Below ₹60,000</SelectItem>
                        <SelectItem value="lower-middle">₹60,000 - ₹1,20,000</SelectItem>
                        <SelectItem value="middle">₹1,20,000 - ₹3,00,000</SelectItem>
                        <SelectItem value="high">Above ₹3,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <RadioGroup defaultValue="general">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sc" id="sc" />
                          <Label htmlFor="sc">SC</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="st" id="st" />
                          <Label htmlFor="st">ST</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="obc" id="obc" />
                          <Label htmlFor="obc">OBC</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Special Categories</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pregnant" />
                        <Label htmlFor="pregnant">Pregnant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="differently-abled" />
                        <Label htmlFor="differently-abled">Differently Abled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bpl" />
                        <Label htmlFor="bpl">BPL Card Holder</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Health Conditions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "Anemia", "Diabetes", "Hypertension", "Tuberculosis", 
                      "Cancer", "HIV/AIDS", "Heart Disease", "None"
                    ].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition.toLowerCase().replace(/[/\s]/g, '-')} />
                        <Label htmlFor={condition.toLowerCase().replace(/[/\s]/g, '-')}>{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="bg-health-blue hover:bg-health-blue/90">
                    Check Eligibility
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {showResults && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-health-blue flex items-center">
                  <Check size={20} className="mr-2" /> Eligible Schemes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Janani Suraksha Yojana (JSY)",
                      description: "Financial assistance for safe institutional delivery",
                      eligibility: "Pregnant women in rural areas, BPL category",
                      benefit: "Cash benefit of ₹1,400"
                    },
                    {
                      name: "Pradhan Mantri Matru Vandana Yojana",
                      description: "Maternity benefit program providing partial wage compensation",
                      eligibility: "Pregnant and lactating mothers for first live birth",
                      benefit: "₹5,000 in three installments"
                    },
                    {
                      name: "National Iron Plus Initiative",
                      description: "Program to prevent and control anemia",
                      eligibility: "Children, adolescents and women with anemia",
                      benefit: "Free iron supplements and medical tests"
                    },
                    {
                      name: "Ayushman Bharat",
                      description: "Comprehensive healthcare coverage",
                      eligibility: "BPL families, low-income households",
                      benefit: "Health insurance cover of ₹5 lakhs per family per year"
                    },
                  ].map((scheme, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-health-blue">{scheme.name}</h3>
                        <Button size="sm" variant="outline" className="text-health-blue h-7">
                          View Details
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-500">Eligibility</p>
                          <p>{scheme.eligibility}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Benefit</p>
                          <p>{scheme.benefit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-health-blue flex items-center">
                <BookOpen size={20} className="mr-2" /> Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>The Government of India offers various health and welfare schemes to support citizens, especially those from underprivileged backgrounds.</p>
                <p>Use this tool to check eligibility for different schemes based on your demographic and health information.</p>
                <Button variant="outline" className="w-full text-health-blue">
                  Learn more about schemes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-health-blue flex items-center">
                <Award size={20} className="mr-2" /> Popular Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Ayushman Bharat",
                  "Janani Suraksha Yojana",
                  "Pradhan Mantri Matru Vandana Yojana",
                  "National Rural Health Mission",
                  "Poshan Abhiyan"
                ].map((scheme, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span>{scheme}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchemeChecker;
