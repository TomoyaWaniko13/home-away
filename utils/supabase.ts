import { createClient } from '@supabase/supabase-js';

// 84. Supabase Upload Image

const bucket = 'temp-home-away';

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

// https://supabase.com/docs/guides/storage/uploads/standard-uploads
// SupabaseのJavaScriptクライアントを作成するための関数です。
// これにより、Supabaseの各種サービス（データベース、ストレージなど）にアクセスできます。
const supabase = createClient(url, key);

// https://supabase.com/docs/guides/storage/uploads/standard-uploads
// 画像ファイルをSupabaseのストレージにアップロードし、その公開URLを返す機能を提供します。
export const uploadImage = async (image: File) => {
  const timestamp = Date.now();

  // オリジナルのファイル名にタイムスタンプを付加することで、ファイル名の一意性を確保し、名前の衝突を防ぎます。
  const newFileName = `${timestamp}-${image.name}`;

  // { data }: アップロード結果のデータ部分を取得します。成功すればファイルのメタデータが含まれます。
  // { cacheControl: '3600' }は、ブラウザやCDNがこの画像を1時間（3600秒）キャッシュすることを指示します。
  const { data } = await supabase.storage.from(bucket).upload(newFileName, image, { cacheControl: '3600' });

  // アップロードが失敗した場合（dataがnullまたはundefinedの場合）、エラーをスローします。
  if (!data) throw new Error('Image upload failed');

  // getPublicUrl()メソッドを使用して、アップロードしたファイルの公開URLを取得します。
  return supabase.storage.from(bucket).getPublicUrl(newFileName).data.publicUrl;
};
