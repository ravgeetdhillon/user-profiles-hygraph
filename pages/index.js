// 1
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// 2
export default function ProfilesPage() {
  // 3
  const query = gql`
    {
      profiles {
        gitHubUsername
        location
        userDetails {
          bio
        }
        weatherDetails {
          main {
            temp
            feels_like
          }
        }
      }
    }
  `;

  // 4
  const { loading, error, data } = useQuery(query);

  // 5
  if (!loading && !error && data) {
    return (
      <div className="mx-auto w-50 py-5">
        <h1 className="mb-4">Profiles</h1>

        <div>
          {data.profiles.map((profile, index) => (
            <div
              className={`py-4 ${
                data.profiles.length - 1 !== index ? "border-bottom" : ""
              }`}
              key={profile.id}
            >
              <Link
                href={`https://github.com/${profile.gitHubUsername}`}
                passHref
              >
                <h3>{profile.gitHubUsername}</h3>
              </Link>
              <p>{profile.userDetails.bio}</p>
              <div className="d-flex">
                <div className="border-end pe-4">
                  <div className="text-muted">Location</div>
                  <div>{capitalize(profile.location)}</div>
                </div>
                <div className="border-end px-4">
                  <div className="text-muted">Temperature</div>
                  <div>
                    {Math.round(profile.weatherDetails.main.temp)}&#8451;
                  </div>
                </div>
                <div className="ps-4">
                  <div className="text-muted">Feels Like</div>
                  <div>
                    {Math.round(profile.weatherDetails.main.feels_like)}&#8451;
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
