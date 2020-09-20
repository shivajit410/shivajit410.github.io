(function ($) {

    $(window).on("load", function () {

        var filteredData = 0;

        function urlCheck() {
            if (window.location.href.lastIndexOf("?") >= 0) {
                const param = window.location.href.slice(
                    window.location.href.lastIndexOf("?") + 1
                );
                fetchData(param);

                var url = window.location.href
                    .slice(window.location.href.lastIndexOf("?") + 1)
                    .split("&");
                url.forEach(function (value, index) {
                    if (value.indexOf("launch_success") >= 0) {
                        $(
                            "input[type=radio][name='launch_success'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).prop("checked", true);
                        $(
                            "input[type=radio][name='launch_success'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).data("waschecked", true);
                    }
                    if (value.indexOf("land_success") >= 0) {
                        $(
                            "input[type=radio][name='land_success'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).prop("checked", true);
                        $(
                            "input[type=radio][name='land_success'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).data("waschecked", true);
                    }
                    if (value.indexOf("launch_year") >= 0) {
                        $(
                            "input[type=radio][name='launch_year'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).prop("checked", true);
                        $(
                            "input[type=radio][name='launch_year'][value='" +
                            value.slice(value.indexOf("=") + 1) +
                            "']"
                        ).data("waschecked", true);
                    }
                });
            } else {
                fetchData();
            }
        }

        // Populating data from here
        function populateData(data) {
            var cardData = $(".card-wrapper");
            cardData.empty();
            data.forEach(function (launchData, index) {
                cardData.append(`
                                <div class="card">
                                    <img src="${launchData.links.mission_patch_small}" alt="${launchData.mission_name}"> 
                                    <!-- <img src="media/placeholder.png" alt="${launchData.mission_name}"> -->
                                    <div class="content-wrapper">
                                        <h4>${launchData.mission_name} #${launchData.flight_number}</h4>
                                        <div class="data-row">
                                            <span>Mission Ids:</span>
                                            <span>${launchData.mission_id[0]}</span>
                                        </div>
                                        <div class="data-row">
                                            <span>Launch Year:</span>
                                            <span>${launchData.launch_year}</span>
                                        </div>
                                        <div class="data-row">
                                            <span>Successful Launch:</span>
                                            <span>${launchData.launch_success}</span>
                                        </div>
                                        <div class="data-row">
                                            <span>Successful Landing:</span>
                                            <span>${launchData.rocket.first_stage.cores[0].land_success}</span>
                                        </div>
                                    </div>
                                </div>
                            `);
            });
        }

        // Applying filters

        $(document).on("click", "input[type=radio]", function (event) {
            var previousValue = $(this).data("waschecked");
            if (previousValue === true) {
                this.checked = false;
                $("input[type=radio][name=" + $(this).attr("name") + "]").data(
                    "waschecked",
                    false
                );
                $(this).data("waschecked", false);
            } else {
                this.checked = true;
                $("input[type=radio][name=" + $(this).attr("name") + "]").data(
                    "waschecked",
                    false
                );
                $(this).data("waschecked", true);
            }
            fetchData();
        });

        function fetchData(param = 0) {
            if (param) {
                $(".card-wrapper").hide();
                $.ajax({
                        url: "https://api.spaceXdata.com/v3/launches?limit=100&" + param,
                        type: "get"
                    })
                    .done(function (response) {
                        filteredData = response;
                        populateData(filteredData);
                        if (response.length) {
                            setTimeout(function () {
                                $(".card-wrapper").show();
                            }, 400);
                        } else {
                            setTimeout(function () {}, 400);
                        }
                    })
                    .fail(function (error) {});
            } else {
                var data = {};
                $("form")
                    .serializeArray()
                    .map(function (x) {
                        data[x.name] = x.value;
                    });
                $(".card-wrapper").hide();
                $.ajax({
                        url: "https://api.spaceXdata.com/v3/launches?limit=100&" + $.param(data),
                        type: "get"
                    })
                    .done(function (response) {
                        filteredData = response;
                        populateData(filteredData);

                        const baseurl = window.location.href.slice(
                            window.location.href.indexOf("?") + 1
                        );
                        history.pushState(null, null, "?" + $.param(data) + "");

                        if (response.length) {
                            setTimeout(function () {
                                $(".card-wrapper").show();
                            }, 400);
                        }
                    })
                    .fail(function (error) {});
            }
        }

        urlCheck();

    });
})(jQuery);