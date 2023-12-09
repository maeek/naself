import './properties-list.scss';

export interface PropertyListProps {
  title?: string;
  children?: React.ReactNode;
}

export const PropertyList = ({ title, children }: PropertyListProps) => {
  return (
    <div className='properties'>
      <h5 className='properties__title'>{title}</h5>
      <ul className='properties__list'>{children}</ul>
    </div>
  );
};
