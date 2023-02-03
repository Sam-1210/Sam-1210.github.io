function Type({content='', delayPerCharacter=100, animate=0, startAfter=0, repeat=false})
{
    const [index, setIndex] = useState(0);
    const [isForward, setIsForward] = useState(true);

    useEffect(() => {
        if(animate === 0) {
            if(index >= content.length && repeat === true) {
                setIndex(0);
            }
        } else if (animate === 1)
        {
            if (index >= content.length)
            {
                setIsForward(false);
            }
            else if (index <= 0)
            {
                

            }
        }
        else if (animate === -1) {
            if (index >= content.length)
            {
                setIsForward(false);
            }
        }

        if (index >= 0 && index < content.length)
        {
            setTimeout(() => {
                setTimeout(() => {
                    if (isForward)
                    {
                        setIndex(index + 1);
                    }
                    else
                    {
                        setIndex(index - 1);
                    }
                }, delayPerCharacter);
            }, startAfter);
        }
    }, [index]);

    return (
        <>
            {
                content.substring(0, index)
            }
        </>
    )
}