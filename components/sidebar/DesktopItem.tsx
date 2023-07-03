import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <li key={label}>
      <Link
        href={href}
        className={clsx(
          `
            group 
            flex 
            flex-col
            gap-x-3
            items-center
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            hover:text-black 
            hover:bg-gray-100
          `,
          active && "bg-gray-100 text-black",
          !active && "text-gray-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
