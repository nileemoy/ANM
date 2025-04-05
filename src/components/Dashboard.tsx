import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Users, FileText, Bell, ArrowRight, Calendar, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card as DialogCard,
  CardContent as DialogCardContent,
  CardHeader as DialogCardHeader,
  CardTitle as DialogCardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const [isSosOpen, setIsSosOpen] = useState(false);

  const emergencyContacts = [
    {
      type: "Hospital",
      number: "108",
      description: "Emergency Medical Services",
    },
    {
      type: "Police",
      number: "100",
      description: "Emergency Police Services",
    },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-health-blue">Welcome, ANM Worker</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar size={16} /> April 5, 2025
        </Button>
      </div>
      
      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-health-yellow to-health-teal border-none text-health-blue">
          <CardContent className="p-6 flex flex-col items-start">
            <Users size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Register Patient</h3>
            <p className="mb-4">Add new patients to the system</p>
            <Button variant="secondary" className="mt-auto bg-white hover:bg-gray-100" onClick={() => window.location.href = '/patients'}>
              New Patient <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-health-green to-health-lightGreen border-none text-health-blue">
          <CardContent className="p-6 flex flex-col items-start">
            <FileText size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Health Assessment</h3>
            <p className="mb-4">Conduct new health evaluation</p>
            <Button variant="secondary" className="mt-auto bg-white hover:bg-gray-100" onClick={() => window.location.href = '/assessment'}>
              Start Assessment <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-health-blue to-health-teal border-none text-white">
          <CardContent className="p-6 flex flex-col items-start">
            <Mic size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Voice Assistant</h3>
            <p className="mb-4">Ask health questions in your language</p>
            <Button variant="secondary" className="mt-auto bg-white hover:bg-gray-100 text-health-blue" onClick={() => window.location.href = '/voice-assistant'}>
              Ask Assistant <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Stats and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-health-blue mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { id: 1, name: "Meera Devi", action: "Assessment", time: "1 hour ago" },
                { id: 2, name: "Rahul Singh", action: "Registration", time: "3 hours ago" },
                { id: 3, name: "Anita Kumari", action: "Follow-up", time: "Yesterday" }
              ].map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-health-lightGreen flex items-center justify-center text-health-blue font-bold">
                      {activity.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-health-blue" onClick={() => window.location.href = '/activity'}>
                View All Activity <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-health-blue mb-4">Health Metrics</h3>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Assessments</span>
                    <span className="text-health-blue font-bold">24/30</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Registrations</span>
                    <span className="text-health-blue font-bold">18/20</span>
                  </div>
                  <Progress value={90} className="h-2 bg-gray-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Follow-ups</span>
                    <span className="text-health-blue font-bold">12/15</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-100" />
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <h4 className="font-medium mb-3">Health Conditions This Week</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { condition: "Anemia", count: 8, color: "bg-health-yellow" },
                      { condition: "Hypertension", count: 5, color: "bg-health-teal" },
                      { condition: "Diabetes", count: 3, color: "bg-health-green" },
                      { condition: "Pregnancy", count: 6, color: "bg-health-blue" }
                    ].map((item) => (
                      <div key={item.condition} className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.condition}</span>
                        <span className="text-sm font-bold ml-auto">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="monthly" className="space-y-4">
                <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Monthly data visualization will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* SOS Button */}
      <div className="flex justify-center my-8">
        <Dialog open={isSosOpen} onOpenChange={setIsSosOpen}>
          <DialogTrigger asChild>
            <Button size="lg" variant="destructive" className="px-8 py-6 rounded-full text-lg font-bold animate-pulse-soft">
              <Bell className="mr-2" /> SOS Emergency Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Emergency Contacts</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {emergencyContacts.map((contact) => (
                <DialogCard key={contact.type}>
                  <DialogCardHeader>
                    <DialogCardTitle className="flex items-center justify-between">
                      {contact.type}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto bg-white hover:bg-gray-100 text-red-600"
                        onClick={() => handleCall(contact.number)}
                      >
                        Call <span className="ml-2">{contact.number}</span>
                      </Button>
                    </DialogCardTitle>
                  </DialogCardHeader>
                  <DialogCardContent>
                    <p className="text-sm text-gray-500">{contact.description}</p>
                  </DialogCardContent>
                </DialogCard>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
