import Image from 'next/image';

// 115. Image Container Component

type Props = {
  mainImage: string;
  name: string;
};

// 画像のアスペクト比を維持しながら、セクション全体をカバーするようなレイアウトです。
const ImageContainer = ({ mainImage, name }: Props) => {
  return (
    // Next.js の Image コンポーネントで fill プロパティを使用すると、画像は親要素いっぱいに広がるように設定されます。
    // fill を効果的に機能させるためには、親要素が position: relative、position: absolute、または position: fixed のいずれかである必要があります。
    <section className={'h-[300px] md:h-[500px] relative mt-8'}>
      <Image src={mainImage} fill sizes={'100vw'} alt={name} className={'object-cover rounded'} priority />;
    </section>
  );
};

export default ImageContainer;
