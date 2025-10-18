
days = range(1,32)
months = range(1,13)
years = range(0,100)

dates = {}
for year in years:
    for month in months:
        for day in days:
            dates[f"{str(day).zfill(2)}{str(month).zfill(2)}{str(year).zfill(2)}"] = 0

non_dates_count = 0
character_count = 5

with open("digits - billion.txt", "r") as file:
    date_str = file.read(6)

    while len(date_str) == 6:
        if date_str in dates:
            dates[date_str] += 1
        else:
            non_dates_count += 1

        date_str = date_str[1:] + file.read(1)
        character_count += 1

found_dates = [key for (key, value) in dates.items() if value > 0]
missing_dates = [key for (key, value) in dates.items() if value == 0]

print(f"Among the first {character_count} digits of Pi:\n")
print(f"Valid dates found: {len(found_dates)} ({100*len(found_dates)/len(dates)}%):")
print("\n".join([" - " + date for date in found_dates[:20]]))
print(" - ...")
print(f"Dates missing: {len(missing_dates)} ({len(missing_dates)/len(dates)}%):")
print("\n".join([" - " + date for date in missing_dates[:20]]))
print(" - ...")


# Among the first 1000000002 digits of Pi:
# Valid dates found: 37200 (100.0%)