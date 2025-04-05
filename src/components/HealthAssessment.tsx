import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, AlertTriangle, ChevronRight, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

// Using a different icon since Microphone is not available in lucide-react
const MicrophoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2c0-2.76 2.24-5 5-5s5 2.24 5 5h-2c0-2.21-1.79-4-4-4s-4 1.79-4 4h-2c0-3.31 2.69-6 6-6s6 2.69 6 6h-2c0-1.66-1.34-3-3-3s-3 1.34-3 3z" />
  </svg>
);

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface FormData {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  weight: string;
  height: string;
  symptoms: string;
  medications: string;
  allergies: string;
  diet: string;
  gestationalAge: string;
  lastMenstrualPeriod: string;
  complications: string;
}

interface AssessmentData {
  vitalSigns: {};
  nutrition: {};
  pregnancy: {};
  general: {};
}

interface Patient {
  id: string;
  name: string;
  age: number;
  village: string;
  lastVisit: string;
  conditions: string[];
  assessments: string[];
}

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Meera Devi",
    age: 28,
    village: "Chandipur",
    lastVisit: "March 10, 2025",
    conditions: ["Anemia", "Hypertension"],
    assessments: ["2025-03-10", "2025-02-15", "2025-01-20"]
  },
  {
    id: "P002",
    name: "Rahul Singh",
    age: 45,
    village: "Gopalnagar",
    lastVisit: "February 15, 2025",
    conditions: ["Hypertension", "Diabetes"],
    assessments: ["2025-02-15", "2025-01-20", "2024-12-15"]
  },
  {
    id: "P003",
    name: "Anita Kumari",
    age: 32,
    village: "Balrampur",
    lastVisit: "January 30, 2025",
    conditions: ["Diabetes", "Thyroid"],
    assessments: ["2025-01-30", "2024-12-15", "2024-11-20"]
  },
  {
    id: "P004",
    name: "Suresh Kumar",
    age: 52,
    village: "Dhanbad",
    lastVisit: "March 5, 2025",
    conditions: ["Hypertension", "Asthma"],
    assessments: ["2025-03-05", "2025-02-10", "2025-01-15"]
  },
  {
    id: "P005",
    name: "Rita Devi",
    age: 35,
    village: "Ghazipur",
    lastVisit: "February 20, 2025",
    conditions: ["Anemia", "Thyroid"],
    assessments: ["2025-02-20", "2025-01-25", "2024-12-30"]
  },
  {
    id: "P006",
    name: "Mohit Sharma",
    age: 42,
    village: "Varanasi",
    lastVisit: "March 1, 2025",
    conditions: ["Diabetes", "Hyperlipidemia"],
    assessments: ["2025-03-01", "2025-02-05", "2025-01-10"]
  },
  {
    id: "P007",
    name: "Priya Singh",
    age: 29,
    village: "Azamgarh",
    lastVisit: "February 25, 2025",
    conditions: ["Anemia", "Hypertension"],
    assessments: ["2025-02-25", "2025-02-05", "2025-01-15"]
  },
  {
    id: "P008",
    name: "Vijay Kumar",
    age: 48,
    village: "Mau",
    lastVisit: "March 3, 2025",
    conditions: ["Diabetes", "Hyperlipidemia"],
    assessments: ["2025-03-03", "2025-02-08", "2025-01-13"]
  },
  {
    id: "P009",
    name: "Sunita Devi",
    age: 38,
    village: "Basti",
    lastVisit: "February 28, 2025",
    conditions: ["Anemia", "Thyroid"],
    assessments: ["2025-02-28", "2025-02-03", "2025-01-08"]
  },
  {
    id: "P010",
    name: "Rajesh Kumar",
    age: 50,
    village: "Gorakhpur",
    lastVisit: "March 2, 2025",
    conditions: ["Hypertension", "Asthma"],
    assessments: ["2025-03-02", "2025-02-07", "2025-01-12"]
  }
];

const HealthAssessment = () => {
  const [assessmentTab, setAssessmentTab] = useState('general');
  const [isPregnant, setIsPregnant] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<FormData>({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    symptoms: '',
    medications: '',
    allergies: '',
    diet: '',
    gestationalAge: '',
    lastMenstrualPeriod: '',
    complications: '',
  });

  useEffect(() => {
    if (selectedPatient) {
      // Load patient's existing data
      setFormData({
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        symptoms: '',
        medications: '',
        allergies: '',
        diet: '',
        gestationalAge: '',
        lastMenstrualPeriod: '',
        complications: '',
      });
    }
  }, [selectedPatient]);

  const handlePatientChange = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    setSelectedPatient(patient);
  };

  const handleAddPatient = () => {
    // Navigate to patient registration
    window.location.href = '/patients';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedPatient) return;

      // Here you would typically make an API call to save the assessment
      console.log('Submitting assessment data:', {
        patientId: selectedPatient.id,
        formData,
        tab: assessmentTab
      });

      // Reset form after submission
      setFormData({
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        symptoms: '',
        medications: '',
        allergies: '',
        diet: '',
        gestationalAge: '',
        lastMenstrualPeriod: '',
        complications: '',
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const handleVoiceInput = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in your browser');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Hindi language
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log('Speech result:', speechResult);
        setFormData(prev => ({ ...prev, symptoms: speechResult }));
      };
      recognition.start();
    } catch (error) {
      console.error('Error with voice input:', error);
    }
  };

  if (!selectedPatient) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-health-blue">Health Assessment</h1>
          <p className="text-gray-600">Evaluate health status and get AI-powered recommendations</p>
        </div>
        <Select defaultValue="P001" onValueChange={handlePatientChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
            ))}
            <SelectItem value="new">+ Add New Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockPatients.map((patient) => (
          <Card 
            key={patient.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePatientChange(patient.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <span className="px-2 py-1 bg-health-blue/10 text-health-blue text-sm rounded-full">
                    {patient.age} yrs
                  </span>
                </div>
                <p className="text-gray-500">{patient.village}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    Last Visit: {patient.lastVisit}
                  </p>
                  <p className="text-sm text-gray-500">
                    Previous Visits: {patient.assessments.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <Button 
          onClick={handleAddPatient}
          className="bg-health-blue hover:bg-health-blue/90"
        >
          <span className="mr-2">+</span> Add New Patient
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-health-blue">Health Assessment</h1>
          <p className="text-gray-600">Evaluating {selectedPatient.name}</p>
        </div>
        <Select defaultValue={selectedPatient.id} onValueChange={handlePatientChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
            ))}
            <SelectItem value="new">+ Add New Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-health-blue">Patient: {selectedPatient.name}, {selectedPatient.age}</CardTitle>
            <div className="bg-health-lightGreen/30 text-health-blue px-3 py-1 rounded-full text-sm">
              Previous Visits: {selectedPatient.assessments.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assessment" className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assessment" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Village</p>
                    <p className="font-medium">{selectedPatient.village}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Visit</p>
                    <p className="font-medium">{selectedPatient.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Known Conditions</p>
                    <p className="font-medium">{selectedPatient.conditions.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <div className="flex space-x-2 overflow-x-auto py-2">
                  <Button 
                    variant={assessmentTab === 'general' ? 'default' : 'outline'} 
                    onClick={() => setAssessmentTab('general')}
                    className={assessmentTab === 'general' ? 'bg-health-blue hover:bg-health-blue/90' : ''}
                  >
                    General
                  </Button>
                  <Button 
                    variant={assessmentTab === 'vitals' ? 'default' : 'outline'}
                    onClick={() => setAssessmentTab('vitals')}
                    className={assessmentTab === 'vitals' ? 'bg-health-blue hover:bg-health-blue/90' : ''}
                  >
                    Vital Signs
                  </Button>
                  <Button 
                    variant={assessmentTab === 'nutrition' ? 'default' : 'outline'}
                    onClick={() => setAssessmentTab('nutrition')}
                    className={assessmentTab === 'nutrition' ? 'bg-health-blue hover:bg-health-blue/90' : ''}
                  >
                    Nutrition
                  </Button>
                  <Button 
                    variant={assessmentTab === 'pregnancy' ? 'default' : 'outline'}
                    onClick={() => setAssessmentTab('pregnancy')}
                    className={assessmentTab === 'pregnancy' ? 'bg-health-blue hover:bg-health-blue/90' : ''}
                  >
                    Pregnancy
                  </Button>
                </div>

                {assessmentTab === 'vitals' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="temperature">Temperature (°C)</Label>
                        <Input
                          id="temperature"
                          name="temperature"
                          type="number"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          placeholder="Enter temperature"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                        <Input
                          id="bloodPressure"
                          name="bloodPressure"
                          value={formData.bloodPressure}
                          onChange={handleInputChange}
                          placeholder="Enter blood pressure"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                        <Input
                          id="heartRate"
                          name="heartRate"
                          type="number"
                          value={formData.heartRate}
                          onChange={handleInputChange}
                          placeholder="Enter heart rate"
                        />
                      </div>
                      <div>
                        <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                        <Input
                          id="respiratoryRate"
                          name="respiratoryRate"
                          type="number"
                          value={formData.respiratoryRate}
                          onChange={handleInputChange}
                          placeholder="Enter respiratory rate"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-health-blue hover:bg-health-blue/90">
                        Save Vital Signs
                      </Button>
                    </div>
                  </form>
                )}

                {assessmentTab === 'nutrition' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Enter weight"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Enter height"
                      />
                    </div>
                    <div>
                      <Label htmlFor="diet">Diet</Label>
                      <Select
                        name="diet"
                        value={formData.diet}
                        onValueChange={(value) => handleInputChange({ target: { name: 'diet', value } } as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-health-blue hover:bg-health-blue/90">
                        Save Nutrition Data
                      </Button>
                    </div>
                  </form>
                )}

                {assessmentTab === 'pregnancy' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="gestationalAge">Gestational Age (weeks)</Label>
                      <Input
                        id="gestationalAge"
                        name="gestationalAge"
                        type="number"
                        value={formData.gestationalAge}
                        onChange={handleInputChange}
                        placeholder="Enter gestational age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastMenstrualPeriod">Last Menstrual Period</Label>
                      <Input
                        id="lastMenstrualPeriod"
                        name="lastMenstrualPeriod"
                        type="date"
                        value={formData.lastMenstrualPeriod}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="complications">Pregnancy Complications</Label>
                      <Textarea
                        id="complications"
                        name="complications"
                        value={formData.complications}
                        onChange={handleInputChange}
                        placeholder="Enter any pregnancy complications"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-health-blue hover:bg-health-blue/90">
                        Save Pregnancy Data
                      </Button>
                    </div>
                  </form>
                )}

                {assessmentTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Current Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        placeholder="Enter current symptoms"
                      />
                    </div>
                    <div>
                      <Label>Medications</Label>
                      <Textarea
                        id="medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleInputChange}
                        placeholder="Enter current medications"
                      />
                    </div>
                    <div>
                      <Label>Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="Enter known allergies"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleVoiceInput} className="bg-health-blue hover:bg-health-blue/90">
                        <MicrophoneIcon /> Voice Input
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAssessment;
