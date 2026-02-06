import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChildStore } from "../../store/childStore";
import Header from "../../components/Header";
import { CURRENCIES } from "../../Constants";
import Toast from "../../components/Toast";

export default function ChildFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addChild = useChildStore((s) => s.addChild);
  const updateChild = useChildStore((s) => s.updateChild);
  const children = useChildStore((s) => s.children);

  const editingChild = children.find((c) => c.id === id);

  const [name, setName] = useState(editingChild?.name || "");
  const [age, setAge] = useState(editingChild?.age?.toString() || "");
  const [amount, setAmount] = useState(editingChild?.amount?.toString() || "");
  const [rate, setRate] = useState(editingChild?.rate?.toString() || "");
  const [startDate, setStartDate] = useState(editingChild?.startDate || "");
  const [currency, setCurrency] = useState(editingChild?.currency || "₹");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!age || Number(age) < 1 || Number(age) > 18) e.age = "Age must be 1–18";
    if (!amount || Number(amount) <= 0) e.amount = "Enter a valid amount";
    if (!rate || Number(rate) <= 0) e.rate = "Enter a valid rate";
    if (!startDate) e.startDate = "Select a start date";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const childData = {
      name: name.trim(),
      age: Number(age),
      amount: Number(amount),
      rate: Number(rate),
      startDate,
      currency,
    };

    if (editingChild) {
      updateChild({ id: editingChild.id, ...childData });
      setToast({ message: "Child updated successfully", type: "success" });
    } else {
      addChild(childData);
      setToast({ message: "Child added successfully", type: "success" });
    }

    setTimeout(() => navigate("/"), 1000);
  };

  const inputStyle = (hasErr: boolean) =>
    `w-full px-4 py-3 rounded-xl border-[1.5px] ${
      hasErr ? "border-red-400" : "border-gray-200"
    } text-sm text-gray-800 bg-white transition-all duration-200 outline-none focus:border-green-400 focus:shadow-[0_0_0_3px_rgba(56,160,92,0.1)] placeholder:text-gray-400`;

  return (
    <div className="min-h-screen flex items-start justify-center px-5 pt-10 pb-10 bg-[#f0f4f3]">
      <Header title={editingChild ? "Edit Child" : "Add Child"} />

      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] px-6 pt-8 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-7">
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-2xl">
            {editingChild ? "✏️" : "👶"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 m-0">
              {editingChild ? "Edit Child" : "Add Child"}
            </h2>
            <p className="text-[12.5px] text-gray-400 m-0 mt-0.5">
              {editingChild
                ? "Update the details below"
                : "Fill in the details to get started"}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Child's Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle(!!errors.name)}
            />
            {errors.name && (
              <p className="text-[11.5px] text-red-400 mt-1.5 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Age + Currency */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Age
              </label>
              <input
                type="number"
                placeholder="8"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={1}
                max={18}
                className={inputStyle(!!errors.age)}
              />
              {errors.age && (
                <p className="text-[11.5px] text-red-400 mt-1.5 font-medium">
                  {errors.age}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`${inputStyle(false)} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%27%236b7a7a%27 d=%27M2 4l4 4 4-4z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-8 cursor-pointer`}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount + Rate */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Initial Amount
              </label>
              <input
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0}
                inputMode="numeric"
                className={inputStyle(!!errors.amount)}
              />
              {errors.amount && (
                <p className="text-[11.5px] text-red-400 mt-1.5 font-medium">
                  {errors.amount}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Annual Rate %
              </label>
              <input
                type="number"
                placeholder="12"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min={0}
                inputMode="numeric"
                className={inputStyle(!!errors.rate)}
              />
              {errors.rate && (
                <p className="text-[11.5px] text-red-400 mt-1.5 font-medium">
                  {errors.rate}
                </p>
              )}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Investment Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputStyle(!!errors.startDate)}
            />
            {errors.startDate && (
              <p className="text-[11.5px] text-red-400 mt-1.5 font-medium">
                {errors.startDate}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-7">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-[13px] rounded-[13px] border-[1.5px] border-gray-200 bg-white text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-[2] py-[13px] rounded-[13px] border-none bg-gradient-to-br from-green-600 to-blue-500 text-white text-sm font-semibold shadow-[0_3px_14px_rgba(56,160,92,0.30)] hover:shadow-[0_5px_20px_rgba(56,160,92,0.40)] hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            {editingChild ? "Save Changes" : "Add Child"}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
