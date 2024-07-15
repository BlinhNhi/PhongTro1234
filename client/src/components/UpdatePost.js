import { CreatePost } from "../container/system";

function UpdatePost({ setIsEdit }) {
    // console.log(dataEdit);
    return (
        <div
            onClick={e => {
                e.stopPropagation()
                setIsEdit(false)
            }}
            className="absolute top-0 left-0 right-0 bottom-0 justify-center flex bg-overlay-30"
        >
            <div
                onClick={e => e.stopPropagation()}
                className="max-w-1100 w-full bg-white overflow-y-auto">
                <CreatePost isEdit></CreatePost>
            </div>
        </div>
    );
}

export default UpdatePost;