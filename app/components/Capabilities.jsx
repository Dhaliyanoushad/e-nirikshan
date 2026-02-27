"use client";

import { FileCheck, Camera, LineChart, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Capabilities() {
  const features = [
    {
      title: "Plan Verification",
      desc: "Project plans are checked against past project data, seasonal conditions, and typical execution timelines to identify unrealistic expectations early.",
      icon: FileCheck,
    },

    {
      title: "Progress Verification",
      desc: "Site photos and updates provide visual confirmation of work completed, reducing dependence on manual reporting alone.",
      icon: Camera,
    },

    {
      title: "Risk Monitoring",
      desc: "Work progress is continuously tracked to identify delays early and help authorities take corrective action in time.",
      icon: LineChart,
    },

    {
      title: "Issue Alerts",
      desc: "When progress slows or deviations occur, responsible officials are notified immediately to ensure timely response.",
      icon: Bell,
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-[#001F3F] overflow-hidden">
      {/* subtle background glow */}

      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0A4D92] blur-[120px] opacity-20" />

      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4B8BBE] blur-[120px] opacity-20" />

      {/* heading */}

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          How e-Nirikshan Strengthens Oversight
        </h2>

        <p className="text-[#4B8BBE] max-w-xl mx-auto">
          Ensuring projects stay on track through continuous verification and
          monitoring
        </p>
      </div>

      {/* grid */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {features.map((feature, i) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div
                className="
                bg-white/10
                backdrop-blur-lg
                border border-white/15
                rounded-xl
                p-8
                hover:bg-white/15
                transition
              "
              >
                <Icon className="text-[#4B8BBE] mb-4" size={28} />

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* bottom line */}

      <div className="text-center mt-16 text-[#4B8BBE] relative z-10">
        Supporting transparent and accountable public infrastructure delivery
      </div>
    </section>
  );
}
