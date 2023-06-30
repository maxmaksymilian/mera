export type PhonePrefixOptionType = {
  name: string;
  value: string;
  code: string;
  handleClick: () => void;
};

export const PhonePrefixOption = ({
  name,
  value,
  code,
  handleClick,
}: PhonePrefixOptionType) => (
  <div
    data-value={code}
    className='cursor-pointer py-1 px-5 hover:bg-navy hover:text-white'
    onClick={handleClick}
  >
    <span className='inline-block w-14 text-sm '>({value})</span>
    <span className='pl-2.5 text-sm'>
      {name.length > 20 ? name.substring(0, 20) + '...' : name}
    </span>
  </div>
);
