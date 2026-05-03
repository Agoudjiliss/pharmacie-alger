import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, CheckCircle, Phone, User, FileText, ArrowRight } from "lucide-react";
import { useUploadPrescription } from "@workspace/api-client-react";

type Step = "upload" | "contact" | "success";

export default function OrdonnancePage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useUploadPrescription();

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileDataUrl(e.target?.result as string);
    };
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = () => {
    if (!patientName || !phone || !fileDataUrl) return;
    upload.mutate(
      { data: { patientName, phone, fileDataUrl, notes } },
      { onSuccess: () => setStep("success") }
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#16a34a] py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.3em] text-green-200 font-semibold mb-2 uppercase">Service exclusif</div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-3">
            Concierge Ordonnance
          </h1>
          <p className="text-green-100 text-sm max-w-md mx-auto leading-relaxed">
            Déposez votre ordonnance en toute sécurité. Notre équipe pharmaceutique la traite et vous contacte.
          </p>
        </div>
      </div>
      <div className="h-0.5 bg-[#15803d]" />

      <div className="max-w-2xl mx-auto px-6 py-14">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {["upload", "contact"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s || (step === "success" && i < 2)
                  ? "bg-[#16a34a] text-white"
                  : step === "contact" && s === "upload"
                  ? "bg-[#16a34a] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}>
                {(step === "contact" && s === "upload") || (step === "success" && i === 0)
                  ? <CheckCircle size={14} />
                  : i + 1}
              </div>
              {i < 1 && <div className={`w-12 h-px ${step !== "upload" ? "bg-[#16a34a]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 — Upload */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre ordonnance</h2>
              <p className="text-sm text-gray-500 mb-8">
                Glissez votre fichier ou cliquez pour le sélectionner (PDF, JPG, PNG).
              </p>

              {/* Drop zone */}
              <div
                className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                  dragOver ? "border-[#16a34a] bg-green-50" : file ? "border-[#16a34a] bg-green-50" : "border-gray-200 hover:border-[#16a34a] hover:bg-green-50/50"
                }`}
                style={{ minHeight: 220 }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center py-14 gap-4">
                  {file ? (
                    <>
                      <CheckCircle size={36} className="text-[#16a34a]" />
                      <div className="text-sm font-semibold text-gray-900">{file.name}</div>
                      <div className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} ko — Cliquez pour changer</div>
                    </>
                  ) : (
                    <>
                      <Upload size={36} className="text-gray-300" />
                      <div className="text-sm text-gray-400 text-center">
                        Glissez votre ordonnance ici<br />
                        <span className="text-xs">ou cliquez pour sélectionner</span>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>

              {/* Security notice */}
              <div className="flex items-start gap-3 mt-5 p-4 bg-green-50 rounded-xl border border-green-200">
                <Shield size={16} className="text-[#16a34a] mt-0.5 shrink-0" />
                <p className="text-xs text-green-800 leading-relaxed">
                  <strong>Votre confidentialité est protégée.</strong> Vos données médicales sont traitées de manière strictement confidentielle conformément à la législation algérienne.
                </p>
              </div>

              <button
                onClick={() => file && setStep("contact")}
                disabled={!file}
                className="w-full mt-6 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#16a34a] hover:bg-[#15803d]"
              >
                Continuer <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* Step 2 — Contact */}
          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vos coordonnées</h2>
              <p className="text-sm text-gray-500 mb-8">
                Pour que notre équipe puisse vous contacter dès que votre ordonnance est prête.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold tracking-wide text-gray-700 block mb-1.5">Nom complet</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Prénom Nom"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-wide text-gray-700 block mb-1.5">Téléphone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XX XX XX"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-wide text-gray-700 block mb-1.5">Note (optionnel)</label>
                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Informations complémentaires pour le pharmacien..."
                      rows={3}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep("upload")}
                  className="px-5 py-3 text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors rounded-xl"
                >
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!patientName || !phone || upload.isPending}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-40 bg-[#16a34a] hover:bg-[#15803d]"
                >
                  {upload.isPending ? "Envoi en cours..." : "Déposer mon ordonnance"}
                  {!upload.isPending && <ArrowRight size={14} />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Success */}
          {step === "success" && upload.data && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={32} className="text-[#16a34a]" />
              </motion.div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-3">Ordonnance reçue</h2>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
                {upload.data.message}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 inline-block text-left mx-auto mb-8">
                <div className="text-xs text-gray-400 mb-1">Numéro de référence</div>
                <div className="font-mono text-lg font-bold text-[#16a34a]">{upload.data.reference}</div>
              </div>
              <div>
                <button
                  onClick={() => { setStep("upload"); setFile(null); setFileDataUrl(""); setPatientName(""); setPhone(""); setNotes(""); }}
                  className="text-sm text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4"
                >
                  Déposer une autre ordonnance
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
