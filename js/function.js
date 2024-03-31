let playedElements = []

;
(() => {
    
    console.log("HEY WELCOME TO THE SYTHWAVE ERA !!")
 dropSection = document.querySelector("#dropSection"),
        reset = document.querySelectorAll(".resetButton"),
        dropZones = document.querySelectorAll(".drop-zone"),
        allAudio = document.querySelectorAll("audio"),
        mixerContainer = document.querySelectorAll("#mixerContainer"),
        playBtn = document.querySelectorAll(".play-btn"),
        playBtn1 = document.getElementById("playbtn1"),
        playBtn2 = document.getElementById("playbtn2"),
        playBtn3 = document.getElementById("playbtn3"),
        images = document.querySelectorAll("#mixerContainer img"),
        dragableicons = document.querySelector("#dragableicons")

    let draggablePieces = document.querySelectorAll("#iconContainer img")

 

    playBtn1.addEventListener("click", (e) => {
        console.log(playedElements)
        if (playedElements.length) {
            const playingSongForThisButton = playedElements.find((el) =>
                el.target.endsWith("1")
            )
            if (!playingSongForThisButton) return

            if (playingSongForThisButton.played) {
                playingSongForThisButton.element.pause()
                const removeElement = document.querySelector(
                    playingSongForThisButton.remove
                )
                playedElements = playedElements.map((el) =>
                    el.target.endsWith("1") ? {...el, played: false } : el
                )
                removeElement.remove()
                let image = document.getElementById("playButton1");
                image.src = "images/play_button.png"
           
            }
        }
    })
    playBtn2.addEventListener("click", (e) => {
        console.log(playedElements)
        if (playedElements.length) {
            const playingSongForThisButton = playedElements.find((el) =>
                el.target.endsWith("2")
            )
            if (!playingSongForThisButton) return

            if (playingSongForThisButton.played) {
                playingSongForThisButton.element.pause()
                const removeElement = document.querySelector(
                    playingSongForThisButton.remove
                )
                playedElements = playedElements.map((el) =>
                    el.target.endsWith("2") ? {...el, played: false } : el
                )
                removeElement.remove()
                let image = document.getElementById("playButton2");
                image.src = "images/pause_button.svg"
        
            }
        }
    })
    playBtn3.addEventListener("click", (e) => {
        console.log(playedElements)
        if (playedElements.length) {
            const playingSongForThisButton = playedElements.find((el) =>
                el.target.endsWith("3")
            )
            if (!playingSongForThisButton) return

            if (playingSongForThisButton.played) {
                playingSongForThisButton.element.pause()
                const removeElement = document.querySelector(
                    playingSongForThisButton.remove
                )
                playedElements = playedElements.map((el) =>
                    el.target.endsWith("3") ? {...el, played: false } : el
                )
                removeElement.remove()
                let image = document.getElementById("playButton3");
                image.src = "images/play-btn.svg"
            } else {
                playingSongForThisButton.element.play()
                playingSongForThisButton.parent.appendChild(
                    playingSongForThisButton.gifReplica
                )
                playedElements = playedElements.map((el) =>
                    el.target.endsWith("3") ? {...el, played: true } : el
                )
                let image = document.getElementById("playButton3");
                image.src = "images/pause.svg"
            }
        }
    })

    function resetImage() {
        console.log(this)

        dropZones.forEach((zone) => {
            if (zone.childElementCount === 1) {
                piece = zone.firstElementChild
                iconContainer.appendChild(piece)
            }
        })

        images.forEach((image) => image.classList.add("hidden"))
    }

    function resetSound() {
        allAudio.forEach((audio) => audio.pause())
    }

    reset.forEach((thumbnail) => thumbnail.addEventListener("click", resetImage)),
        reset.forEach((thumbnail) =>
            thumbnail.addEventListener("click", resetSound)
        )

    draggablePieces.forEach((piece) => {
        piece.addEventListener("dragstart", function(e) {
            console.log("draggin...")

            e.dataTransfer.setData("text/plain", this.id)
        })
    })

    dropZones.forEach((zone) => {
        
        zone.addEventListener("dragover", function(e) {
            e.preventDefault()
            console.log("drag and drop audio")
        })

     
        zone.addEventListener("drop", function(e) {
            e.preventDefault()
            console.log("drag drop")

            let draggedElement = e.dataTransfer.getData("text/plain")

            console.log("you dragged: ", draggedElement)

            if (this.childElementCount == 1) {
                return
            }

            let audioKey = document.querySelector(`#${draggedElement}`).dataset.key

            let imgKey = document.querySelector(`#${draggedElement}`).dataset.target

            console.log("audio-key", audioKey)

            let currentAudioClip = document.querySelector(
                `audio[data-key="${audioKey}"]`
            )



            console.log("777", currentAudioClip)

            
            var val = ".drag-img" + draggedElement
            const targetElementNumber = draggedElement.split("")
            const target = e.target.parentNode.childNodes[3].id

            const isAlreadyDedicatedToSomeone = playedElements.find(
                (el) => el.audioKey === audioKey
            )

            const isAlreadyDedicatedASong = playedElements.find(
                (el) => el.target === target
            )
            console.log(isAlreadyDedicatedASong)
            if (isAlreadyDedicatedASong) return
            currentAudioClip.play()

            currentAudioClip.loop = "true"

            if (isAlreadyDedicatedToSomeone) {
                playedElements = playedElements.filter((el) => el.audioKey !== audioKey)
                console.log(playedElements)
            }
            playedElements.push({
                element: currentAudioClip,
                played: true,
                audioKey,
                parent: e.target,
                remove: val,
                gifReplica: document.querySelector(val),
                target,
            })

            console.log(playedElements)

            console.log(e.target.parentNode.childNodes[3].id)
            console.log("heythere!", val)
                
            e.target.appendChild(document.querySelector(val))

            console.log('orig data', e.target.parentNode.childNodes[3].childNodes[1]);

            let image = e.target.parentNode.childNodes[3].childNodes[1]
            image.src = "images/pause.svg"

            document.querySelector(`#${draggedElement}`).style.background = "blue"
            document.querySelector(`#${draggedElement}`).style.opacity = "0.6"

        })
    })
})()