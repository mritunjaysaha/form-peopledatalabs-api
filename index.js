function FormComponent(formEl, firstEl, lastEl, socialUrlEl) {
    const API_KEY =
        "a367376836a0052565139133a37ccb588a91d7bb49ecf8cbc40f11d650af0d7a";

    function downloadCSV(addresses) {
        var test_array = [
            ["name1", 2, 3],
            ["name2", 4, 5],
            ["name3", 6, 7],
            ["name4", 8, 9],
            ["name5", 10, 11],
        ];
        var fname = "IJGResults";

        var csvContent = "data:text/csv;charset=utf-8,";
        $("#pressme").click(function () {
            addresses.forEach(function (infoArray, index) {
                dataString = infoArray.join(",");
                csvContent += dataString + "\n";
            });

            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        });
    }

    /** Convert a 2D array into a CSV string
     */
    function arrayToCsv(data) {
        return data
            .map(
                (row) =>
                    row
                        .map(String) // convert every value to String
                        .map((v) => v.replaceAll('"', '""')) // escape double colons
                        .map((v) => `"${v}"`) // quote it
                        .join(",") // comma-separated
            )
            .join("\r\n"); // rows starting on new lines
    }

    /** Download contents as a file
     * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
     */
    function downloadBlob(content, filename, contentType) {
        // Create a blob
        var blob = new Blob([content], { type: contentType });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { social_url } = initialValues;
        fetch(
            `https://api.peopledatalabs.com/v5/person/enrich?api_key=${API_KEY}&pretty=True&profile=${social_url}`
        )
            .then((res) => {
                res.json().then(({ data }) => {
                    const { emails } = data;

                    const emailAddresses = [];

                    emails.forEach(({ address }) =>
                        emailAddresses.push([address])
                    );

                    const csv = arrayToCsv([["E-mails"], emailAddresses]);

                    downloadBlob(csv, "export.csv", "text/csv;charset=utf-8;");
                });
            })
            .catch((err) => console.log(err.message));
    }

    function handleInput(e) {
        e.preventDefault();
        const { name, value } = e.target;

        initialValues[name] = value;

        console.log({ initialValues });
    }

    const initialValues = {
        first_name: "",
        last_name: "",
        social_url: "",
    };

    formEl.addEventListener("submit", function (e) {
        handleSubmit(e);
    });

    firstEl.addEventListener("change", function (e) {
        handleInput(e);
    });

    lastEl.addEventListener("change", function (e) {
        handleInput(e);
    });

    socialUrlEl.addEventListener("change", function (e) {
        handleInput(e);
    });
}
