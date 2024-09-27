// 65. FormContainer Component

// prevStateパラメータにより、以前の状態にアクセスできます。これは状態の更新や比較に役立ちます。

// FormData オブジェクトが第二引数として渡されています。
// これにより、フォームの各入力フィールドの値を個別に、あるいはまとめて簡単に取得できます。

// Promise<T>:　Promise は JavaScript での非同期処理を扱うためのオブジェクトです。
// 　　　　　　　 <T> は、Promiseが解決（resolve）されたときに返される値の型を指定します。
// { message: string }: これは、Promiseが解決されたときに返されるオブジェクトの構造を定義しています。

export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>;
