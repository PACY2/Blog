import React from "react";

const Useful_tags = () => {
  return (
    <div>
      <div className="p-2 bg-dark-background rounded sticky top-0">
        <h4 className="font-semibold mb-4 mt-1 text-pure-white">
          Useful <span className="text-primary">Tags</span>
        </h4>
        <div className="flex flex-wrap gap-2 ">
          {[1, 2, 3, 4, 5, 6, 4, 8].map((e) => (
            <div className="p-1 bg-background rounded text-sm">Mouhrach</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Useful_tags;
