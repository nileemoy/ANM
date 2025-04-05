import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Search, User, Save, QrCode } from 'lucide-react';

interface FormData {
  name: string;
  age: string;
  gender: string;
  village: string;
  phone: string;
  aadhar: string;
  pregnant: string;
  conditions: string;
}

const PatientRegistration = () => {
  const [step, setStep] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    village: '',
    phone: '',
    aadhar: '',
    pregnant: '',
    conditions: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting patient data:', formData);
      setFormData({
        name: '',
        age: '',
        gender: '',
        village: '',
        phone: '',
        aadhar: '',
        pregnant: '',
        conditions: '',
      });
      setSearchMode(false);
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-health-blue">Patient Registration</h1>
        <p className="text-gray-600">Register a new patient or search for existing records</p>
      </div>
      
      <div className="flex justify-between mb-6">
        <Button 
          variant={searchMode ? "outline" : "default"}
          className={!searchMode ? "bg-health-blue hover:bg-health-blue/90" : ""}
          onClick={() => setSearchMode(false)}
        >
          <User size={18} className="mr-2" /> New Patient
        </Button>
        <Button 
          variant={searchMode ? "default" : "outline"}
          className={searchMode ? "bg-health-blue hover:bg-health-blue/90" : ""}
          onClick={() => setSearchMode(true)}
        >
          <Search size={18} className="mr-2" /> Search Existing
        </Button>
      </div>
      
      {searchMode ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-health-blue">Search Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search by name, ID, or phone..." className="flex-1" />
                <Button className="bg-health-blue hover:bg-health-blue/90">
                  <Search size={18} className="mr-2" /> Search
                </Button>
              </div>
              
              <div className="text-center p-4 border border-dashed rounded-lg">
                <Button variant="outline" className="flex items-center gap-2">
                  <QrCode size={18} /> Scan QR Code
                </Button>
                <p className="text-sm text-gray-500 mt-2">Quickly access patient records by scanning their QR code</p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Recent Patients</h3>
                <div className="space-y-2">
                  {[{
                    id: "P001", name: "Meera Devi", age: 28, village: "Chandipur"
                  }, {
                    id: "P002", name: "Rahul Singh", age: 45, village: "Gopalnagar"
                  }, {
                    id: "P003", name: "Anita Kumari", age: 32, village: "Balrampur"
                  }].map((patient) => (
                    <div key={patient.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.age} yrs • {patient.village}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium text-health-blue">{patient.id}</p>
                        <p className="text-gray-500">Last visit: 3 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-health-blue">
              {step === 1 && "Personal Information"}
              {step === 2 && "Contact & Identification"}
              {step === 3 && "Medical History"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="village">Village</Label>
                    <Input
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      placeholder="Enter village name"
                      required
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={handleInputChange}
                      placeholder="Enter Aadhar number"
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Pregnant?</Label>
                    <RadioGroup
                      name="pregnant"
                      value={formData.pregnant}
                      onValueChange={(value) => handleInputChange({ target: { name: 'pregnant', value } } as any)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" />
                        <Label>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" />
                        <Label>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Known Conditions</Label>
                    <Textarea
                      name="conditions"
                      value={formData.conditions}
                      onChange={handleInputChange}
                      placeholder="Enter any known medical conditions"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-health-blue hover:bg-health-blue/90">
                    Register Patient
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientRegistration;
