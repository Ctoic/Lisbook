import React, { useState, useEffect } from 'react'

const Profile = () => {
  const [profilePic, setProfilePic] = useState('https://avatars.githubusercontent.com/u/90936436?v=4')
  const [name, setName] = useState('Najam Ali Abbas')
  const [isEditingName, setIsEditingName] = useState(false)
  const [audiobookCount] = useState(5)
  const [totalTime] = useState('20 hrs')
  const [friends, setFriends] = useState([])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchUsername, setSearchUsername] = useState('')
  const [expandedCards, setExpandedCards] = useState({})

  // Initial friends data
  const initialFriends = [
    {
      login: 'YakeDev',
      name: 'Eric Kay',
      avatar_url: 'https://avatars.githubusercontent.com/u/137875228?v=4',
      html_url: 'https://github.com/YakeDev'
    },
    {
      login: 'VaradJadhav',
      name: 'Varad Sunil Jadhav',
      avatar_url: 'https://avatars.githubusercontent.com/u/96735054?v=4',
      html_url: 'https://github.com/VaradJadhav'
    },
    {
      login: 'AdityaBavadekar',
      name: 'Aditya Bavadekar',
      avatar_url: 'https://avatars.githubusercontent.com/u/64344960?v=4',
      html_url: 'https://github.com/AdityaBavadekar'
    },
    {
      login: 'khandelwal20sid',
      name: 'Siddharth Khandelwal',
      avatar_url: 'https://avatars.githubusercontent.com/u/58730831?v=4',
      html_url: 'https://github.com/khandelwal20sid'
    },
    {
      login: 'IngaleChinmay04',
      name: 'Chinmay Ingale',
      avatar_url: 'https://avatars.githubusercontent.com/u/143017442?v=4',
      html_url: 'https://github.com/IngaleChinmay04'
    },
    {
      login: 'vatsaljain-hub',
      name: 'vatsaljain-hub',
      avatar_url: 'https://avatars.githubusercontent.com/u/60287913?v=4',
      html_url: 'https://github.com/vatsaljain-hub'
    },
    {
      login: 'shalomrionafernandes',
      name: 'Shalom Fernandes',
      avatar_url: 'https://avatars.githubusercontent.com/u/132253795?v=4',
      html_url: 'https://github.com/shalomrionafernandes'
    },
    {
      login: 'thilakjo',
      name: 'Thilak Jo',
      avatar_url: 'https://avatars.githubusercontent.com/u/115476524?v=4',
      html_url: 'https://github.com/thilakjo'
    }
  ]

  // Load friends from localStorage or use initial friends
  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friends'))
    if (storedFriends && storedFriends.length > 0) {
      setFriends(storedFriends)
    } else {
      setFriends(initialFriends)
      localStorage.setItem('friends', JSON.stringify(initialFriends))
    }
  }, [])

  const handleProfilePicUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setProfilePic(event.target.result)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleAddFriend = () => {
    setShowSearchBar(!showSearchBar)
    if (!showSearchBar) {
      setTimeout(() => {
        document.getElementById('search-github')?.focus()
      }, 100)
    }
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      addFriend()
    }
  }

  const addFriend = async () => {
    const username = searchUsername.trim()
    if (username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (response.ok) {
          const data = await response.json()
          
          // Add friend to the list
          const newFriends = [...friends, data]
          setFriends(newFriends)
          
          // Save to localStorage
          localStorage.setItem('friends', JSON.stringify(newFriends))
          
          // Clear search and hide search bar
          setSearchUsername('')
          setShowSearchBar(false)
        } else {
          alert('GitHub user not found.')
        }
      } catch (error) {
        console.error('Error fetching GitHub profile:', error)
        alert('There was an error fetching the GitHub profile.')
      }
    } else {
      alert('Please enter a GitHub username.')
    }
  }

  const toggleFriendCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Section - 25% width */}
          <div className="w-full lg:w-1/4">
            <div className="bg-[#181818] rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h1 className="text-3xl font-bold mb-6 text-[#94d769]">
                Your Profile
              </h1>
              <img
                src={profilePic}
                alt="Profile Icon"
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-[#94d769] object-cover cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(148,215,105,0.5)] transition-all duration-300"
                onClick={handleProfilePicUpload}
              />
              <div className="space-y-3 text-gray-300">
                <p className="text-lg">
                  <span className="font-semibold">Name:</span>{' '}
                  {isEditingName ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
                      className="bg-gray-700 text-white px-2 py-1 rounded border border-[#94d769] outline-none focus:ring-2 focus:ring-[#94d769]"
                      autoFocus
                    />
                  ) : (
                    <>
                      {name}{' '}
                      <i 
                        className="bi bi-pencil cursor-pointer hover:text-[#94d769] transition-colors duration-200" 
                        onClick={() => setIsEditingName(true)}
                      ></i>
                    </>
                  )}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Audiobooks Bookmarked:</span> {audiobookCount}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Total Time Listened:</span> {totalTime}
                </p>
              </div>
              <button 
                className="mt-6 w-full bg-[#94d769] hover:bg-[#7bc142] text-[#191414] font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={handleProfilePicUpload}
              >
                Change Picture
              </button>
            </div>
          </div>

          {/* Friends Section - 75% width */}
          <div className="w-full lg:w-3/4">
            <div className="bg-[#181818] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-[#94d769]">
                Friends
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends.map((friend, index) => (
                  <div key={friend.login} className="flex flex-col">
                    <div 
                      className="bg-[#374151] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(148,215,105,0.2)] hover:bg-[#4b5563]"
                      onClick={() => toggleFriendCard(index)}
                    >
                      <img
                        src={friend.avatar_url}
                        className="w-16 h-16 rounded-full mx-auto border-2 border-[#94d769] object-cover transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(148,215,105,0.5)]"
                        alt={friend.login}
                      />
                      <h5 className="mt-3 text-white font-semibold text-base">
                        {friend.name || friend.login}
                      </h5>
                    </div>
                    <div 
                      className={`text-center transition-all duration-300 overflow-hidden ${
                        expandedCards[index] ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <a
                        href={friend.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-transparent border border-[#94d769] text-[#94d769] hover:bg-[#94d769] hover:text-[#191414] px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub Profile
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Friend and Search Bar Container */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="w-full lg:w-1/4">
            <button 
              className="w-full bg-[#25a56a] hover:bg-[#1db954] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={handleAddFriend}
            >
              <i className="bi bi-person-plus mr-2"></i> Add Friend
            </button>
          </div>
          <div 
            className={`w-full lg:w-3/4 flex gap-2 transition-all duration-300 ${
              showSearchBar ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="flex-1 bg-[#374151] border border-[#4b5563] text-white px-4 py-3 rounded-lg outline-none focus:border-[#94d769] focus:ring-2 focus:ring-[#94d769] focus:ring-opacity-20 transition-all duration-300"
            />
            <button 
              className="bg-[#25a56a] hover:bg-[#1db954] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
              onClick={addFriend}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
