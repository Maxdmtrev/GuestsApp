const guestDelete = document.querySelector('.entries')
if (guestDelete !== null) {
    guestDelete.addEventListener('click', async (event) => {
        console.log(event)
        event.preventDefault();
        // event.stopPropagation();
        console.log(guestDelete);
        console.log(event.target.id);
        if (event.target.innerText === 'delete') {
            const response = await fetch(`/moderator/admin/${event.target.id}`, {
                method: 'delete', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    id: event.target.id,

                })
            });

            const result = await response.json();
            console.log(result);
            event.target.parentElement.parentElement.parentElement.remove()
        }
    });
};

