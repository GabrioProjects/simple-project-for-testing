
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Import = () => {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Import Successful",
            description: `Successfully imported ${file.name}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadTemplate = (platform: string) => {
    // In a real app, this would download an actual template file
    toast({
      title: "Template Downloaded",
      description: `${platform} template downloaded successfully`,
    });
  };

  return (
    <DashboardLayout currentPage="Import CSV">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Import Your Trades</h1>
          <p className="text-gray-600">
            Upload CSV files from MetaTrader, TradingView, or other trading platforms
          </p>
        </div>

        {/* Supported Platforms */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">MetaTrader 4/5</CardTitle>
              <CardDescription>Direct export support</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <FileText className="h-12 w-12 mx-auto text-blue-600" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('MetaTrader')}
              >
                <Download className="mr-2 h-4 w-4" />
                Get Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">TradingView</CardTitle>
              <CardDescription>Paper trading exports</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <FileText className="h-12 w-12 mx-auto text-green-600" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('TradingView')}
              >
                <Download className="mr-2 h-4 w-4" />
                Get Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Custom Format</CardTitle>
              <CardDescription>Use our template</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <FileText className="h-12 w-12 mx-auto text-purple-600" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('Custom')}
              >
                <Download className="mr-2 h-4 w-4" />
                Get Template
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
            <CardDescription>
              Select your trade history CSV file to import
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              
              {!uploadedFile ? (
                <>
                  <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
                  <p className="text-gray-500 mb-4">or click to browse</p>
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Select File
                    </Button>
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">{uploadedFile.name}</span>
                    <Badge variant="secondary">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </Badge>
                  </div>
                  
                  {isUploading ? (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-gray-500">
                        Importing trades... {uploadProgress}%
                      </p>
                    </div>
                  ) : uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Import completed successfully!</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Import Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Import Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">MetaTrader 4/5</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Open MetaTrader platform</li>
                  <li>Go to Account History tab</li>
                  <li>Right-click and select "Save as Report"</li>
                  <li>Choose "Detailed Statement" format</li>
                  <li>Save as HTML, then convert to CSV</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">TradingView</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Open TradingView Paper Trading</li>
                  <li>Go to Orders & Positions panel</li>
                  <li>Click on "History" tab</li>
                  <li>Use browser's export function</li>
                  <li>Save the data as CSV format</li>
                </ol>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• Ensure your CSV includes: Date, Pair, Type, Size, Entry Price, Exit Price, P&L</li>
                    <li>• Use proper date format (YYYY-MM-DD or DD/MM/YYYY)</li>
                    <li>• File size should not exceed 10MB</li>
                    <li>• Duplicate trades will be automatically detected and skipped</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Imports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Imports</CardTitle>
            <CardDescription>
              Your import history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "mt4_export_june.csv", date: "2024-06-24", trades: 15, status: "success" },
                { name: "tradingview_paper.csv", date: "2024-06-20", trades: 8, status: "success" },
                { name: "manual_trades.csv", date: "2024-06-18", trades: 0, status: "error" }
              ].map((import_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{import_.name}</p>
                      <p className="text-xs text-gray-500">{import_.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {import_.trades} trades
                    </span>
                    {import_.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Import;
