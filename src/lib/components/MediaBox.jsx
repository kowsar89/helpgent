import userImg from 'Assets/img/chatdashboard/user.png';
import Image from './Image.jsx';

const MediaBox = ({
    chatingMedia,
    img,
    lastMessage,
    initialConv,
    title,
    metaList,
}) => {
    const replyerImg = () => {
        if (lastMessage) {
            if(lastMessage.user.avater){
                return (
                    <span className='wpwax-vm-replyer'>
                        <Image src={lastMessage.user.avater} alt='' />
                    </span>
                );
            }else{
                const userString = lastMessage.user.name.slice(0,2);
                return (
                    <span className='wpwax-vm-replyer wpwax-vm-replyer-letter'>
                        <span>{userString}</span>
                    </span>
                )
            }
        }
    };

    return (
        <div className='wpwax-vm-media'>
            {chatingMedia ? (
                typeof img === 'object' ? (
                    <div className='wpax-vm-imglist'>
                        <div className='wpwax-vm-img-include-replyer'>
                            {img[0] === '' ? (
                                <Image src={userImg} alt='' />
                            ) : (
                                <Image src={img[0]} alt='' />
                            )}
                            {replyerImg()}
                        </div>
                    </div>
                ) : null
            ) : typeof img === 'object' ? (
                <div className='wpax-vm-imglist'>
                    {
                        initialConv ?
                            img[0] === '' ? (
                                <Image src={userImg} alt='' />
                            ) : (
                                <Image src={img[0]} alt='' />
                            )
                        :
                        img.map((src, index) => {
                            if (index === 0) {
                                if (src !== '') {
                                    return <Image src={src} alt='' key={index} />;
                                } else {
                                    return <Image src={userImg} alt='' key={index} />;
                                }
                            }
                        })
                    }
                </div>
            ) : null}

            <div className='wpwax-vm-media__body'>
                <h5 className='wpwax-vm-media__title'>{title}</h5>

                {metaList.map((item, i) => {
                    return (
                        <span className='wpwax-vm-media__meta' key={i}>
                            {item.type === 'date' ? (
                                <span className='wpwax-vm-media__meta--date'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                            {item.type === 'email' ? (
                                <span className='wpwax-vm-media__meta--email'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                            {item.type === 'name' ? (
                                <span className='wpwax-vm-media__meta--name'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default MediaBox;
