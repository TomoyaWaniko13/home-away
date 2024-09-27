// 65. FormContainer Component

// prevStateパラメータにより、以前の状態にアクセスできます。これは状態の更新や比較に役立ちます。
//　FormDataオブジェクトを直接扱うことで、フォームの入力値を簡単に取得・処理できます。
// Promiseを返すことで、非同期操作（例：APIリクエスト）をサポートしています。
export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>;
