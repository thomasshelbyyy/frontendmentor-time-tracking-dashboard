document.addEventListener("DOMContentLoaded", function () {

    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            function updateTimeframe(timeFrame) {
                const timeframeText = {
                    daily: { identifier: "Yesterday" },
                    weekly: { identifier: "Last Week" },
                    monthly: { identifier: "Last Month" },
                }
                data.forEach(item => {
                    let titleClass = item.title.toLowerCase()
                    if (titleClass === "self care") {
                        titleClass = "self-care"
                    }
                    const gridItem = document.querySelector(`.item-${titleClass}`)
                    const timeFrameData = item.timeframes[timeFrame]
                    gridItem.querySelector('.current-time').textContent = `${timeFrameData.current}hrs`;
                    gridItem.querySelector(".time").textContent = `${timeFrameData.previous}hrs`
                    gridItem.querySelector(".time-identifier").textContent = timeframeText[timeFrame].identifier
                    gridItem.querySelector(".title").textContent = item.title
                });

                document.querySelectorAll(".btn").forEach(function (button) {
                    button.classList.remove("active")
                })

                document.getElementById(timeFrame).classList.add("active")
            }

            updateTimeframe("daily")

            const buttons = document.querySelectorAll(".btn")

            buttons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const selectedTimeframe = button.id
                    updateTimeframe(selectedTimeframe)
                })
            })

        })
        .catch(error => {
            console.log(error)
        })
})
