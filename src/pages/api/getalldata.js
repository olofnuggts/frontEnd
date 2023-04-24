export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://myplantfunctions.azurewebsites.net/api/getlastdata?code=4RUwpolXXQ1hk_9DaovlnpPXvudZE-HJQUPzrsGVcVpjAzFudQ8Vxg=="
    );
    const data = await response.json();
    const extractedData = [];
    data.forEach(function (obj) {
      const time = obj._children.$1._children.Time._value;
      const tempHumidityStr = obj._children.$1._children.Body._value;

      const tempHumidityObj = JSON.parse(tempHumidityStr);
      const temperature = tempHumidityObj.temperature;
      const humidity = tempHumidityObj.humidity;
      const counter = tempHumidityObj.msgCount;

      // Add the extracted data to the array
      extractedData.push({
        time: time,
        temperature: temperature,
        humidity: humidity,
        counter: counter,
      });
    });
    res.status(200).json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
