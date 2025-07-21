//
//  ContentView.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/23/25.
//

import SwiftUI
import PhotosUI

struct UploadItemView: View {
    @Environment(\.dismiss) var dismiss
    @State var selectedItems: [PhotosPickerItem] = []
    @State var photos: [Image] = []
    @State var imageText: String = "Select Images"
    @State var hasImage: Bool = false
    @State var itemName: String = ""
    @State var location: String = ""
    @State var placedAt: String = ""
    @ObservedObject var viewModel: ContentViewModel
    var body: some View {
        
        NavigationStack {
            VStack {
                VStack {
                    
                    if !hasImage { // checks if there is selected photos
                        ZStack {
                            Rectangle()
                                .frame(maxWidth: .infinity)
                                .frame(height: 300)
                                .cornerRadius(20)
                                .opacity(0.6)
                            Text("No Images Selected Yet")
                                .foregroundStyle(.white)
                        }
                    } else {
                        TabView { // index of the photos
                            ForEach(0..<photos.count, id: \.self){ photoIndex in
                                photos[photoIndex]
                                    .resizable()
                                    .scaledToFit()
                                    .frame(minHeight: 200)
                            }
                        }
                        .tabViewStyle(PageTabViewStyle())
                        .frame(height: 300)
                    }
                    
                    PhotosPicker(selection: $selectedItems, matching: .images) { // photo picker 'button'
                        ZStack {
                            RoundedRectangle(cornerRadius: 10)
                                .frame(maxWidth: .infinity)
                                .frame(height: 55)
                            Text(imageText)
                                .foregroundStyle(.white)
                        }
                        
                    }
                    .onChange(of: selectedItems) {
                        loadTransferable(from: selectedItems) // checks for change in photo
                    }
                    
                    Spacer()
                    
                }
                .padding()
                
                Form {
                    Section(header: Text("Item Name")) {
                        TextField("e.g.: Pencil Case", text: $itemName)
                    }
                    Section(header: Text("Location Found")) {
                        TextField("e.g.: Atrium", text: $location)
                    }
                    Section(header: Text("Returned to:")) {
                        Picker("Returned", selection: $placedAt) {
                            Text("Lost & Found").tag("Lost & Found")
                            Text("General Office").tag("General Office")
                        }
                    }
                    .pickerStyle(.segmented)
                }
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: {
                        dismiss()
                    }) {
                        Image(systemName: "chevron.backward")
                        Text("Back")
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        if !photos.isEmpty {
                            viewModel.items.append(CatalogItem(name: itemName, image: photos[0], placedAtNow: placedAt, found: location))
                            dismiss()
                        }
                    }) {
                        Text("Add")
                        Image(systemName: "plus.app")
                    }
                    .disabled(itemName.isEmpty || location.isEmpty || placedAt.isEmpty || photos.isEmpty)
                }
            }
        }
        
        
    }
    func loadTransferable(from imageSelections: [PhotosPickerItem]) { // complicated func to convert the photo to a image
        photos.removeAll()
        imageText = "Select Images"
        hasImage = false
        Task {
            for imageSelection in imageSelections  {
                if let image = try? await imageSelection.loadTransferable(type: Image.self){
                    photos.append(image)
                    imageText = "Change Images"
                    hasImage = true
                }
                
            }
            
        }
    }
    
}

#Preview {
    UploadItemView(viewModel: ContentViewModel())
}
