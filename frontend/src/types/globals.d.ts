// 一時的な汎用モジュール宣言（未解決のJSモジュール参照を抑制するため）
declare module "*.jsx";
declare module "*.js";
declare module "*.css";

// 必要に応じて個別モジュールを追加できます
declare module "./pages/Home";
