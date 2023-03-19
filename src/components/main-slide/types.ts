export interface IMainSlideProps {
  data: TMainSlide;
  className?: string;
}

export type TMainSlide = {
  type: string;
  id: number;
  slide: string;
  main: boolean;
  title: string;
  text: string;
  btnText: string;
  btnLink: string;
};
