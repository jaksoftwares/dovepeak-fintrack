import Card from "@/components/ui/Card";
import { Plus } from "lucide-react";

export default function ModulePlaceholder({ title, description, icon: Icon }: any) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
            {title}
          </h2>
          <p className="text-slate-500 font-medium max-w-md mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-[#16A34A] text-white rounded-xl text-sm font-bold hover:bg-green-700 hover:-translate-y-0.5 transition-all shadow-lg active:scale-95 ring-4 ring-green-50">
          <Plus className="h-4 w-4" />
          Add New {title.split(' ')[0]}
        </button>
      </section>

      <Card className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 border-dashed border-2">
        <div className="flex flex-col items-center text-center max-w-sm px-6">
          <div className="h-20 w-20 rounded-3xl bg-white flex items-center justify-center text-[#16A34A] shadow-xl border border-slate-100 mb-8 p-5 ring-8 ring-slate-100/50 rotate-3 transition-transform hover:rotate-0">
            {Icon ? <Icon className="h-full w-full" /> : <Plus className="h-full w-full" />}
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3 font-poppins">No {title} data yet</h3>
          <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
            {description.replace('Manage', 'Start managing')} and tracking your financial progress today by adding your first entry.
          </p>
          <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 hover:text-[#16A34A] hover:border-[#16A34A]/50 transition-all shadow-sm">
             Create First Entry
          </button>
        </div>
      </Card>
    </div>
  );
}
