// 119. Description Component

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return <h3 className={'text-lg font-bold mb-2'}>{text}</h3>;
};

export default Title;
