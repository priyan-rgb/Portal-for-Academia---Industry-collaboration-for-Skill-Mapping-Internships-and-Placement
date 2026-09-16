import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity } from '../../types';
import { X, PlusCircle, Sparkles, Tag } from 'lucide-react';

interface PostOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostOpportunityModal: React.FC<PostOpportunityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addOpportunity, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Internship' | 'Full-Time Job' | 'Live Project'>('Internship');
  const [location, setLocation] = useState('Bangalore / Hybrid');
  const [stipend, setStipend] = useState('₹40,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [eligibility, setEligibility] = useState('B.Tech Final/Pre-final Year (CSE, IT, ECE) with min 7.5 CGPA');
  const [deadline, setDeadline] = useState('In 14 days');
  const [description, setDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([
    'Python',
    'SQL & Databases',
    'Cloud Computing & AWS',
  ]);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    if (!skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || skills.length === 0) return;

    addOpportunity({
      title: title.trim(),
      company: currentUser.company || 'CloudScale Technologies',
      companyLogoBg: 'from-blue-600 to-teal-700',
      location,
      type,
      stipend,
      duration,
      requiredSkills: skills,
      eligibility,
      deadline,
      description:
        description.trim() ||
        `Exciting opportunity at ${currentUser.company || 'CloudScale Technologies'} for ambitious students skilled in ${skills.slice(0, 3).join(', ')}.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-600" />
              <span>Post New Industry Opportunity</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish internships, full-time jobs, or live industry projects for verified students.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Role Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cloud Infrastructure Intern, Junior Data Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Opportunity Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time Job">Full-Time Job</option>
                <option value="Live Project">Live Project</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Stipend / CTC
              </label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Duration & Work Mode
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Required Skills Tags Input */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Required Benchmark Skills *
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Add a skill (e.g., Python, Docker, SQL)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-xl font-semibold text-slate-800 transition-colors"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 min-h-12">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200"
                >
                  <Tag className="w-3 h-3 text-teal-600" />
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-teal-600 hover:text-teal-900 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-slate-400 text-xs italic self-center">
                  No skills added yet. Add at least 1 required skill.
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Eligibility Criteria
            </label>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Role Description & Key Deliverables
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline project expectations, daily tooling, and mentorship access..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={skills.length === 0}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm disabled:opacity-40"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
