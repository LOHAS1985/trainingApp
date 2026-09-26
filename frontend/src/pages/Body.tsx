import React from "react";

export default function Body(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">身体測定</h2>
      <div className="p-6 bg-white/5 rounded-lg">
        身体測定データを管理します。
      </div>
    </div>
  );
}
