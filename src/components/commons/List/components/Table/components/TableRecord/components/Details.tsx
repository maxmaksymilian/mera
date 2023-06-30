export const Details = ({
  title,
  value,
}: {
  title?: string;
  value: string;
}) => (
  <>
    {title ? (
      <p className='block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'>
        {title}
      </p>
    ) : null}
    <p className='block max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-4 text-gray'>
      {value}
    </p>
  </>
);
