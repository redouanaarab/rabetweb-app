import React from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, 
  ChevronDown,
  Merge,
  Split,
  RotateCw,
  Trash2,
  FileOutput,
  Edit,
  FileText,
  Book,
  Hash,
  Crop,
  Shield,
  Droplets,
  FileSpreadsheet,
  FileImage,
  ScanLine,
  MessageSquare,
  FileStack,
  Globe,
  HelpCircle,
  Unlock,
  Lock,
  Layers
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ToolsDropdown = () => {
  const toolsData = {
    organize: {
      title: 'Organize',
      items: [
        { name: 'Merge PDF', href: '/merge-pdf', icon: Merge, color: 'bg-indigo-50', iconColor: 'text-indigo-600', hoverColor: 'hover:bg-indigo-100' },
        { name: 'Split PDF', href: '/split-pdf', icon: Split, color: 'bg-violet-50', iconColor: 'text-violet-600', hoverColor: 'hover:bg-violet-100' },
        { name: 'Rotate PDF', href: '/rotate-pdf', icon: RotateCw, color: 'bg-purple-50', iconColor: 'text-purple-600', hoverColor: 'hover:bg-purple-100' },
        { name: 'Delete PDF Pages', href: '/delete-pages', icon: Trash2, color: 'bg-indigo-50', iconColor: 'text-indigo-600', hoverColor: 'hover:bg-indigo-100' },
        { name: 'Extract PDF Pages', href: '/extract-pages', icon: FileOutput, color: 'bg-violet-50', iconColor: 'text-violet-600', hoverColor: 'hover:bg-violet-100' }
      ]
    },
    viewEdit: {
      title: 'View & Edit',
      items: [
        { name: 'Edit PDF', href: '/edit-pdf', icon: Edit, color: 'bg-teal-50', iconColor: 'text-teal-600', hoverColor: 'hover:bg-teal-100' },
        { name: 'PDF Annotator', href: '/annotate-pdf', icon: FileText, color: 'bg-emerald-50', iconColor: 'text-emerald-600', hoverColor: 'hover:bg-emerald-100' },
        { name: 'PDF Reader', href: '/read-pdf', icon: Book, color: 'bg-cyan-50', iconColor: 'text-cyan-600', hoverColor: 'hover:bg-cyan-100' },
        { name: 'Number Pages', href: '/number-pages', icon: Hash, color: 'bg-teal-50', iconColor: 'text-teal-600', hoverColor: 'hover:bg-teal-100' },
        { name: 'Crop PDF', href: '/crop-pdf', icon: Crop, color: 'bg-cyan-50', iconColor: 'text-cyan-600', hoverColor: 'hover:bg-cyan-100' },
        { name: 'Redact PDF', href: '/redact-pdf', icon: Shield, color: 'bg-emerald-50', iconColor: 'text-emerald-600', hoverColor: 'hover:bg-emerald-100' },
        { name: 'Watermark PDF', href: '/watermark-pdf', icon: Droplets, color: 'bg-teal-50', iconColor: 'text-teal-600', hoverColor: 'hover:bg-teal-100' }
      ]
    },
    convertFromPDF: {
      title: 'Convert from PDF',
      items: [
        { name: 'PDF to Excel', href: '/pdf-to-excel', icon: FileSpreadsheet, color: 'bg-green-50', iconColor: 'text-green-600', hoverColor: 'hover:bg-green-100' },
        { name: 'PDF to PPT', href: '/pdf-to-ppt', icon: FileText, color: 'bg-orange-50', iconColor: 'text-orange-600', hoverColor: 'hover:bg-orange-100' },
        { name: 'PDF to JPG', href: '/pdf-to-jpg', icon: FileImage, color: 'bg-yellow-50', iconColor: 'text-yellow-600', hoverColor: 'hover:bg-yellow-100' }
      ]
    },
    convertToPDF: {
      title: 'Convert to PDF',
      items: [
        { name: 'Excel to PDF', href: '/excel-to-pdf', icon: FileSpreadsheet, color: 'bg-green-50', iconColor: 'text-green-600', hoverColor: 'hover:bg-green-100' },
        { name: 'PPT to PDF', href: '/ppt-to-ppt', icon: FileText, color: 'bg-orange-50', iconColor: 'text-orange-600', hoverColor: 'hover:bg-orange-100' },
        { name: 'JPG to PDF', href: '/jpg-to-pdf', icon: FileImage, color: 'bg-yellow-50', iconColor: 'text-yellow-600', hoverColor: 'hover:bg-yellow-100' },
        { name: 'PDF OCR', href: '/pdf-ocr', icon: ScanLine, color: 'bg-red-50', iconColor: 'text-red-600', hoverColor: 'hover:bg-red-100' }
      ]
    },
    aiPDF: {
      title: 'AI PDF',
      items: [
        { name: 'Chat with PDF', href: '/chat-pdf', icon: MessageSquare, color: 'bg-blue-50', iconColor: 'text-blue-600', hoverColor: 'hover:bg-blue-100' },
        { name: 'AI PDF Summarizer', href: '/summarize-pdf', icon: FileStack, color: 'bg-sky-50', iconColor: 'text-sky-600', hoverColor: 'hover:bg-sky-100' },
        { name: 'Translate PDF', href: '/translate-pdf', icon: Globe, color: 'bg-blue-50', iconColor: 'text-blue-600', hoverColor: 'hover:bg-blue-100' },
        { name: 'AI Question Generator', href: '/generate-questions', icon: HelpCircle, color: 'bg-sky-50', iconColor: 'text-sky-600', hoverColor: 'hover:bg-sky-100' }
      ]
    },
    more: {
      title: 'More',
      items: [
        { name: 'Unlock PDF', href: '/unlock-pdf', icon: Unlock, color: 'bg-rose-50', iconColor: 'text-rose-600', hoverColor: 'hover:bg-rose-100' },
        { name: 'Protect PDF', href: '/protect-pdf', icon: Lock, color: 'bg-rose-50', iconColor: 'text-rose-600', hoverColor: 'hover:bg-rose-100' },
        { name: 'Flatten PDF', href: '/flatten-pdf', icon: Layers, color: 'bg-rose-50', iconColor: 'text-rose-600', hoverColor: 'hover:bg-rose-100' }
      ]
    },
    scan: {
      title: 'Scan',
      items: [
        { name: 'PDF Scanner', href: '/scan-pdf', icon: ScanLine, color: 'bg-blue-50', iconColor: 'text-blue-600', hoverColor: 'hover:bg-blue-100' }
      ]
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="focus-visible:ring-0 hover:bg-transparent">
            <LayoutGrid strokeWidth={0} className="!h-6 !w-6 fill-current text-neutral-900" />
            Tools
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-screen p-0 border-0 rounded-none mt-1.5" 
          sideOffset={8}
          style={{ maxWidth: '100vw' }}
        >
          <div className="bg-white border-t shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-200">
          <div className="max-h-dvh overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {Object.values(toolsData).map((category) => (
                  <div key={category.title} className="space-y-3">
                    <h3 className="font-medium text-sm text-gray-500">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${item.hoverColor}`}
                          >
                            <span className={`p-2 rounded ${item.color}`}>
                              <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ToolsDropdown;