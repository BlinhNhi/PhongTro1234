import moment from "moment";
import 'moment/locale/vi'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ItemSmall({ title, price, image, createAt, star }) {
    const formatTimeToVN = (createAt) => {
        return moment(createAt).fromNow()
    }
    const handleStar = (star) => {
        let stars = [];
        for (let i = 1; i <= +star; i++) {
            stars.push(<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>);
        }
        return stars;
    };
    return (
        <div className="w-full flex items-center gap-3 py-2 border-b border-gray-400">
            <img src={image[0]}
                alt="anh"
                className="flex-initial w-[65px] object-cover rounded-md h-[65px]"
            ></img>

            <div className="flex flex-auto flex-col justify-between gap-1">
                <h4 className="text-blue-600 text-[14px] ">
                    {`${title?.slice(0, 45)}...`}
                </h4>
                <div className="text-yellow-400">
                    {handleStar(+star).length > 0 &&
                        handleStar(+star).map((star, number) => {
                            return <span key={number}> {star}</span>;
                        })}
                </div>
                <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-green-500 text-sm">
                        {price}
                    </span>
                    <span className="text-gray-300 text-sm">
                        {formatTimeToVN(createAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ItemSmall;