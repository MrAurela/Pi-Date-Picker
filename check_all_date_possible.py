
# List all days of the form DD/MM/YY:
days = range(1,32)
months = range(1,13)
years = range(0,100)

dates = {}
for year in years:
    for month in months:
        for day in days:
            dates[f"{str(day).zfill(2)}{str(month).zfill(2)}{str(year).zfill(2)}"] = "-"

character_count = 5

with open("digits.txt", "r") as file:
    date_str = file.read(6)

    while len(date_str) == 6:
        if date_str in dates and dates[date_str] == "-":
            dates[date_str] = f"PI6-{character_count-5}"

        date_str = date_str[1:] + file.read(1)
        character_count += 1

found_dates = [key for (key, value) in dates.items() if value != "-"]
missing_dates = [key for (key, value) in dates.items() if value == "-"]

print(f"Among the first {character_count} digits of Pi:\n")
print(f"Valid dates found: {len(found_dates)} ({100*len(found_dates)/len(dates)}%)")
print(f"Dates missing: {len(missing_dates)} ({100*len(missing_dates)/len(dates)}%)")

with open("date_conversions_PI6.txt", "w") as file:
    for date, pi6_dates in dates.items():
        days = date[0:2]
        months = date[2:4]
        years = date[4:]
        if len(years) < 4:
            years = "19"+years if int(years) >= 70 else "20"+years
        file.write(days+"/"+months+"/"+years+": "+pi6_dates+"\n")


# Digits-billion.txt
# Among the first 10428747 digits of Pi:
# Valid dates found: 37200 (100.0%)
#Last date found at index 10428740: 120154

# Digits.txt
