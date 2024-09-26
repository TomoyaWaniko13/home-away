// 65. FormContainer Component

// これは非同期関数で、前の状態（prevState）とフォームデータ（formData）を受け取り、
// メッセージを含むオブジェクトを返すことを期待しています。

export type actionFunction = (
  prevState: any,
  formData: FormDataEvent,
) => Promise<{ message: string }>;
