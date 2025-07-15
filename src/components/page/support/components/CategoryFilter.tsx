interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 rounded-full border text-sm font-medium transition ${selected === cat ? "bg-blue-500 text-white border-blue-500" : "bg-[#F5F5F5] text-[#5F7280] border-gray-300 hover:bg-blue-50"}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
